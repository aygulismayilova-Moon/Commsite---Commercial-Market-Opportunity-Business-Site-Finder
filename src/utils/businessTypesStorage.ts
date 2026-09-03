import { CommercialBusinessType } from '../types';
import { COMMERCIAL_BUSINESS_TYPES } from '../data/commercialBusinessTypes';

const CUSTOM_TYPES_STORAGE_KEY = 'geoguard_user_custom_business_types_v1';
const EDITED_TYPES_STORAGE_KEY = 'geoguard_user_edited_business_types_v1';
const DELETED_TYPES_STORAGE_KEY = 'geoguard_user_deleted_business_types_v1';

export const BUSINESS_TYPES_UPDATED_EVENT = 'geoguard_business_types_updated';

// Helper to notify listeners of changes
export function notifyBusinessTypesUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(BUSINESS_TYPES_UPDATED_EVENT));
  }
}

// Load custom user-created business types
export function getCustomBusinessTypes(): CommercialBusinessType[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_TYPES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load custom business types', e);
    return [];
  }
}

// Load edits made to standard business types: map of id -> modified item
export function getEditedBusinessTypes(): Record<string, CommercialBusinessType> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(EDITED_TYPES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (e) {
    console.error('Failed to load edited business types', e);
    return {};
  }
}

// Load list of deleted business type IDs
export function getDeletedBusinessTypeIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_TYPES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load deleted business types', e);
    return [];
  }
}

// Get next available BUS-xxxx ID
export function getNextBusinessId(): string {
  const custom = getCustomBusinessTypes();
  const allExisting = [...COMMERCIAL_BUSINESS_TYPES, ...custom];
  let maxNum = 504;
  
  for (const item of allExisting) {
    const match = item.business_id.match(/BUS-(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum && num < 90000) {
        maxNum = num;
      }
    }
  }

  const nextNum = maxNum + 1;
  return `BUS-${String(nextNum).padStart(4, '0')}`;
}

// Get the merged list of all business types (custom + edited + standard - deleted)
export function getAllBusinessTypes(): CommercialBusinessType[] {
  const custom = getCustomBusinessTypes();
  const edited = getEditedBusinessTypes();
  const deletedIds = new Set(getDeletedBusinessTypeIds());

  // 1. Process standard catalog
  const processedStandard = COMMERCIAL_BUSINESS_TYPES.filter(
    (item) => !deletedIds.has(item.business_id)
  ).map((item) => {
    if (edited[item.business_id]) {
      return {
        ...edited[item.business_id],
        isModified: true,
      };
    }
    return item;
  });

  // 2. Add custom business types with isCustom flag
  const processedCustom = custom
    .filter((item) => !deletedIds.has(item.business_id))
    .map((item) => ({
      ...item,
      isCustom: true,
    }));

  // Put user-created custom types right at the top for easy access, followed by standard types
  return [...processedCustom, ...processedStandard];
}

// Add a new custom business type
export function addCustomBusinessType(
  newItem: Omit<CommercialBusinessType, 'business_id'> & { business_id?: string }
): CommercialBusinessType {
  const business_id = newItem.business_id?.trim() || getNextBusinessId();
  const fullItem: CommercialBusinessType = {
    ...newItem,
    business_id,
    business_type_name: newItem.business_type_name.trim(),
    online_or_onsite: newItem.online_or_onsite || 'Onsite',
    place: newItem.place?.trim() || 'First Floor',
    approximately_area: newItem.approximately_area?.trim() || '120 m2',
    popularity: newItem.popularity || 'High',
    customer_type: newItem.customer_type || 'all',
    isCustom: true,
  };

  const existingCustom = getCustomBusinessTypes();
  const filtered = existingCustom.filter((c) => c.business_id !== business_id);
  const updated = [fullItem, ...filtered];

  try {
    localStorage.setItem(CUSTOM_TYPES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist custom business type', e);
  }

  notifyBusinessTypesUpdated();
  return fullItem;
}

// Update an existing business type (whether standard or custom)
export function updateBusinessType(
  updatedItem: CommercialBusinessType
): CommercialBusinessType {
  const id = updatedItem.business_id;
  const customList = getCustomBusinessTypes();
  const isCustom = customList.some((c) => c.business_id === id) || updatedItem.isCustom;

  if (isCustom) {
    // It's a custom item, update in custom list
    const updatedCustomList = customList.map((c) =>
      c.business_id === id ? { ...updatedItem, isCustom: true } : c
    );
    try {
      localStorage.setItem(CUSTOM_TYPES_STORAGE_KEY, JSON.stringify(updatedCustomList));
    } catch (e) {
      console.error('Failed to update custom business type', e);
    }
  } else {
    // It's a standard item, store in edited map
    const editedMap = getEditedBusinessTypes();
    editedMap[id] = { ...updatedItem, isModified: true };
    try {
      localStorage.setItem(EDITED_TYPES_STORAGE_KEY, JSON.stringify(editedMap));
    } catch (e) {
      console.error('Failed to update standard business type', e);
    }
  }

  notifyBusinessTypesUpdated();
  return updatedItem;
}

// Delete a business type (or hide standard one)
export function deleteBusinessType(businessId: string): boolean {
  // If in custom, remove from custom
  const customList = getCustomBusinessTypes();
  const isCustom = customList.some((c) => c.business_id === businessId);

  if (isCustom) {
    const updatedCustom = customList.filter((c) => c.business_id !== businessId);
    try {
      localStorage.setItem(CUSTOM_TYPES_STORAGE_KEY, JSON.stringify(updatedCustom));
    } catch (e) {
      console.error('Failed to delete custom business type', e);
    }
  } else {
    // Add to deleted IDs
    const deleted = getDeletedBusinessTypeIds();
    if (!deleted.includes(businessId)) {
      deleted.push(businessId);
      try {
        localStorage.setItem(DELETED_TYPES_STORAGE_KEY, JSON.stringify(deleted));
      } catch (e) {
        console.error('Failed to mark business type as deleted', e);
      }
    }
    // Also remove any edit override
    const editedMap = getEditedBusinessTypes();
    if (editedMap[businessId]) {
      delete editedMap[businessId];
      try {
        localStorage.setItem(EDITED_TYPES_STORAGE_KEY, JSON.stringify(editedMap));
      } catch (e) {}
    }
  }

  notifyBusinessTypesUpdated();
  return true;
}

// Reset a specific business type back to its original catalog values
export function resetBusinessType(businessId: string): boolean {
  // Check if edited
  const editedMap = getEditedBusinessTypes();
  if (editedMap[businessId]) {
    delete editedMap[businessId];
    try {
      localStorage.setItem(EDITED_TYPES_STORAGE_KEY, JSON.stringify(editedMap));
    } catch (e) {}
  }

  // Check if deleted
  const deleted = getDeletedBusinessTypeIds();
  if (deleted.includes(businessId)) {
    const updated = deleted.filter((id) => id !== businessId);
    try {
      localStorage.setItem(DELETED_TYPES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  }

  notifyBusinessTypesUpdated();
  return true;
}

// Reset all customizations back to factory defaults
export function resetAllBusinessTypesToDefault(): void {
  try {
    localStorage.removeItem(CUSTOM_TYPES_STORAGE_KEY);
    localStorage.removeItem(EDITED_TYPES_STORAGE_KEY);
    localStorage.removeItem(DELETED_TYPES_STORAGE_KEY);
  } catch (e) {}
  notifyBusinessTypesUpdated();
}
