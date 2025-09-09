import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import FilterItem from './filterItem';
import { somaliRegions, somaliDistricts } from '../../assets/data/data';

const generateUniqueKey = (prefix, index) => {
  return `${prefix}-${index}-${Math.random().toString(36).substr(2, 9)}`;
};

const AreaFilter = ({ onAreaSelect }) => {
  const [selectedType, setSelectedType] = useState('Gobol');
  const [selectedArea, setSelectedArea] = useState('');

  const areaTypes = ['Jasiirad', 'Gobol', 'Degmooyin'];

  const getAreasByType = (type) => {
    switch(type) {
      case 'Jasiirad':
        return ['Jasiiradda Saami', 'Jasiiradda Xaafuun', 'Jasiiradda Maydh'];
      case 'Gobol':
        return somaliRegions || [];
      case 'Degmooyin':
        return somaliDistricts || [];
      default:
        return [];
    }
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    if (onAreaSelect) {
      onAreaSelect({
        type: selectedType,
        name: area
      });
    }
  };

  return (
    <View className="mb-5">
      <Text className="font-exoSemibold text-darkGrayText text-xs mb-2">
        Nooca Goobta
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-3"
      >
        {areaTypes.map((type, index) => (
          <FilterItem
            key={generateUniqueKey('type', index)}
            item={type}
            selected={selectedType}
            setSelected={setSelectedType}
          />
        ))}
      </ScrollView>

      <Text className="font-exoSemibold text-darkGrayText text-xs mb-2">
        {selectedType}:
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="flex flex-row flex-wrap"
      >
        {getAreasByType(selectedType).map((area, index) => (
          <FilterItem
            key={generateUniqueKey('area', index)}
            item={area}
            selected={selectedArea}
            setSelected={handleAreaSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AreaFilter;
