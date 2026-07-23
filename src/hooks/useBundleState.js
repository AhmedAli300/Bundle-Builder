import { useState, useEffect, useCallback, useMemo } from 'react';
import initialProductsData from '../../public/data/products.json';

const STORAGE_KEY = 'wyze_bundle_config_v1';

export function useBundleState() {
  const [data, setData] = useState(initialProductsData);
  const [loading, setLoading] = useState(false);
  const [openStepId, setOpenStepId] = useState('step-1');
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize selected variants for products with variant options
  const defaultSelectedVariants = useMemo(() => {
    const map = {};
    if (initialProductsData?.steps) {
      initialProductsData.steps.forEach(step => {
        step.products.forEach(product => {
          if (product.hasVariants && product.defaultVariantId) {
            map[product.id] = product.defaultVariantId;
          }
        });
      });
    }
    return map;
  }, []);

  // Compute seed quantities from initialProductsData schema
  const defaultQuantities = useMemo(() => {
    const map = {};
    if (initialProductsData?.steps) {
      initialProductsData.steps.forEach(step => {
        step.products.forEach(product => {
          if (product.initialQty) {
            Object.entries(product.initialQty).forEach(([variantKey, qty]) => {
              const itemKey = product.hasVariants ? `${product.id}:${variantKey}` : product.id;
              map[itemKey] = qty;
            });
          }
        });
      });
    }
    return map;
  }, []);

  const [quantities, setQuantities] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.quantities) return parsed.quantities;
      }
    } catch (err) {
      console.warn('Could not parse saved bundle config from localStorage:', err);
    }
    return defaultQuantities;
  });

  const [selectedVariants, setSelectedVariants] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedVariants) return parsed.selectedVariants;
      }
    } catch (err) {
      console.warn('Could not parse saved variants:', err);
    }
    return defaultSelectedVariants;
  });

  // Fetch data from backend API if available, fallback to static JSON
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3001/api/products');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setData(json.data);
          }
        }
      } catch {
        // Express API not running, fallback gracefully to static JSON import
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Helper to trigger toast messages
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Save current system state to localStorage & API
  const saveBundle = useCallback(async () => {
    const configToSave = {
      quantities,
      selectedVariants,
      openStepId,
      savedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configToSave));
      
      // Try sending to Express backend API bonus endpoint
      try {
        await fetch('http://localhost:3001/api/bundle/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(configToSave)
        });
      } catch {
        // Offline or backend server not running
      }

      showToast('System configuration saved! It will be restored when you return.');
    } catch (err) {
      console.error('Failed to save system:', err);
      showToast('Could not save configuration locally.');
    }
  }, [quantities, selectedVariants, openStepId, showToast]);

  // Reset system configuration back to original design default state
  const resetBundle = useCallback(() => {
    setQuantities(defaultQuantities);
    setSelectedVariants(defaultSelectedVariants);
    setOpenStepId('step-1');
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset bundle to initial design state.');
  }, [defaultQuantities, defaultSelectedVariants, showToast]);

  // Toggle Accordion Step
  const toggleStep = useCallback((stepId) => {
    setOpenStepId(prev => (prev === stepId ? null : stepId));
  }, []);

  // Expand next accordion step
  const nextStep = useCallback((currentStepNumber) => {
    const nextStepId = `step-${currentStepNumber + 1}`;
    setOpenStepId(nextStepId);
  }, []);

  // Select active color variant for a product card
  const selectVariant = useCallback((productId, variantId) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemKey, delta) => {
    setQuantities(prev => {
      const currentQty = prev[itemKey] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return {
        ...prev,
        [itemKey]: newQty
      };
    });
  }, []);

  // Directly set item quantity
  const setQuantity = useCallback((itemKey, newQty) => {
    setQuantities(prev => ({
      ...prev,
      [itemKey]: Math.max(0, newQty)
    }));
  }, []);

  // Calculate distinct products count per step
  const stepSelectedCounts = useMemo(() => {
    const counts = {};
    if (data?.steps) {
      data.steps.forEach(step => {
        let distinctSelected = 0;
        step.products.forEach(product => {
          if (product.hasVariants) {
            const isAnyVariantSelected = product.variants.some(
              v => (quantities[`${product.id}:${v.id}`] || 0) > 0
            );
            if (isAnyVariantSelected) distinctSelected++;
          } else {
            if ((quantities[product.id] || 0) > 0) distinctSelected++;
          }
        });
        counts[step.id] = distinctSelected;
      });
    }
    return counts;
  }, [data, quantities]);

  // Review panel items grouped by category
  const reviewLineItems = useMemo(() => {
    const groups = {
      CAMERAS: [],
      PLAN: [],
      SENSORS: [],
      ACCESSORIES: []
    };

    if (!data?.steps) return groups;

    data.steps.forEach(step => {
      const category = step.categoryKey;
      step.products.forEach(product => {
        if (product.hasVariants) {
          product.variants.forEach(variant => {
            const itemKey = `${product.id}:${variant.id}`;
            const qty = quantities[itemKey] || 0;
            if (qty > 0) {
              groups[category].push({
                itemKey,
                productId: product.id,
                variantId: variant.id,
                title: `${product.name} (${variant.name})`,
                shortName: product.name,
                variantName: variant.name,
                qty,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                billingFrequency: product.billingFrequency,
                isFree: product.isFree
              });
            }
          });
        } else {
          const itemKey = product.id;
          const qty = quantities[itemKey] || 0;
          if (qty > 0) {
            groups[category].push({
              itemKey,
              productId: product.id,
              variantId: null,
              title: product.name,
              shortName: product.name,
              variantName: null,
              qty,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              billingFrequency: product.billingFrequency,
              isFree: product.isFree
            });
          }
        }
      });
    });

    return groups;
  }, [data, quantities]);

  // Pricing calculations
  const totals = useMemo(() => {
    let subtotal = 0;
    let originalSubtotal = 0;
    let totalItems = 0;

    Object.values(reviewLineItems).forEach((items) => {
      items.forEach(item => {
        subtotal += item.price * item.qty;
        const compareAt = item.compareAtPrice !== null && item.compareAtPrice !== undefined
          ? item.compareAtPrice
          : item.price;
        originalSubtotal += compareAt * item.qty;
        totalItems += item.qty;
      });
    });

    const shippingCompare = data?.shipping?.compareAtPrice || 5.99;
    const shippingPrice = data?.shipping?.price || 0.00;

    const totalActive = subtotal + shippingPrice;
    const totalOriginal = originalSubtotal + shippingCompare;
    const totalSavings = Math.max(0, totalOriginal - totalActive);

    return {
      subtotal,
      originalSubtotal,
      totalActive: totalActive.toFixed(2),
      totalOriginal: totalOriginal.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      totalItems
    };
  }, [reviewLineItems, data]);

  return {
    data,
    loading,
    openStepId,
    quantities,
    selectedVariants,
    stepSelectedCounts,
    reviewLineItems,
    totals,
    toastMessage,
    toggleStep,
    nextStep,
    selectVariant,
    updateQuantity,
    setQuantity,
    saveBundle,
    resetBundle
  };
}
