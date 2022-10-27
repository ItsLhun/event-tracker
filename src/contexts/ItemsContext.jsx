import Constants from 'Constants';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { createAlertStream } from 'utils';

// create a context
const ItemsContext = createContext(null);

/**
 * Provider component for ItemsContext
 * @param {*} props {severity, type, isPrediction, title, description}
 * @returns
 */
export const ItemsProvider = (props) => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [discardedItems, setDiscardedItems] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    severity: [],
    type: [],
    isPrediction: [],
    freeText: ''
  });

  const interval = useRef(null);

  // start the alert stream
  const handleStartTapped = () => {
    if (!interval.current) {
      setIsRunning(true);
      interval.current = createAlertStream({
        onNewAlert: handleAddItem,
        intervalDuration: Constants.INTERVAL_DURATION
      });
    }
  };

  // stop the alert stream
  const handleStopTapped = () => {
    if (interval.current) {
      interval.current();
      interval.current = null;
      setIsRunning(false);
    }
  };

  // clear the alert stream
  const handleClearTapped = () => {
    setItems([]);
  };

  // Apply type filter, up to all three types
  const handleTypeFilter = (selectedTypes, workingItems) => {
    if (selectedTypes.length === 0) {
      return workingItems;
    }
    return workingItems.filter((item) => selectedTypes.includes(item.type));
  };

  // Apply severity filter, up to all five severities
  const handleSeverityFilter = (selectedSeverities, workingItems) => {
    if (selectedSeverities.length === 0) {
      return workingItems;
    }
    return workingItems.filter((item) =>
      selectedSeverities.includes(item.severity)
    );
  };

  // Apply freeSearch string to both title and description
  const handleFreeSearchFilter = (freeSearch, workingItems) => {
    if (freeSearch === '') {
      return workingItems;
    }
    return workingItems.filter((item) => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      return title.includes(freeSearch) || description.includes(freeSearch);
    });
  };

  // Apply the selected filters
  const handleApplyFilters = (
    selectedTypes,
    selectedSeverities,
    freeSearch
  ) => {
    const workingItems = items;
    const filteredItems = handleTypeFilter(selectedTypes, workingItems);
    const filteredItems2 = handleSeverityFilter(
      selectedSeverities,
      filteredItems
    );
    const filteredItems3 = handleFreeSearchFilter(freeSearch, filteredItems2);

    setDisplayedItems(filteredItems3);
    const newFilters = {
      ...activeFilters,
      severity: selectedSeverities,
      type: selectedTypes,
      freeText: freeSearch
    };
    setActiveFilters(newFilters);
  };

  const handleDiscardOrCompleteItem = (item, mode) => {
    // add property 'reason' to item
    const newItem = { ...item, reason: mode };
    const newDiscardedItems = [...discardedItems, newItem];
    setDiscardedItems(newDiscardedItems);
    const newItems = items.filter((i) => i.key !== item.key);
    setItems(newItems);
  };

  useEffect(() => {
    handleApplyFilters(
      activeFilters.type,
      activeFilters.severity,
      activeFilters.freeText
    );
  }, [items]);

  // Add new item to items array
  const handleAddItem = async (item) => {
    setItems((prev) => [item, ...prev]);
  };

  // start the alert stream on mount
  useEffect(() => {
    if (!interval.current) {
      interval.current = createAlertStream({
        onNewAlert: handleAddItem,
        intervalDuration: Constants.INTERVAL_DURATION
      });
      setIsRunning(true);
    }
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleStartTapped,
        handleStopTapped,
        handleClearTapped,
        isRunning,
        displayedItems,
        discardedItems,
        setDisplayedItems,
        setDiscardedItems,
        handleApplyFilters,
        activeFilters,
        handleDiscardOrCompleteItem
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

/**
 * Hook to get the ItemsContext
 * @returns
 */
export const useItems = () => {
  return useContext(ItemsContext);
};
