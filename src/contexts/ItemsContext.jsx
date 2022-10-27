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
    title: '',
    description: ''
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

  // Apply the selected filters
  const handleApplyFilters = async (selectedTypes, selectedSeverities) => {
    const workingItems = items;
    const filteredItems = handleTypeFilter(selectedTypes, workingItems);
    const filteredItems2 = handleSeverityFilter(
      selectedSeverities,
      filteredItems
    );
    setDisplayedItems(filteredItems2);
    const newFilters = {
      ...activeFilters,
      severity: selectedSeverities,
      type: selectedTypes
    };
    setActiveFilters(newFilters);
  };

  useEffect(() => {
    handleApplyFilters(activeFilters.type, activeFilters.severity);
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
        activeFilters
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
