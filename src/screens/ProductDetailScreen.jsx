import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorNames = {
    '#000': 'Black',
    '#fff': 'White',
    '#ff0000': 'Red',
    '#0066cc': 'Blue',
    '#1a1a1a': 'Dark',
    '#ff6b6b': 'Coral',
    '#333': 'Charcoal',
    '#666': 'Gray',
    '#4a4a4a': 'Slate',
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    addToCart(cartItem);
    Alert.alert('Success', 'Product added to cart!', [
      { text: 'Continue Shopping', onPress: () => navigation.goBack() },
      { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigation.navigate('Cart');
    }, 500);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Section */}
      <LinearGradient
        colors={['#e0e0e0', '#f5f5f5']}
        style={styles.imageSection}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.saleBadge}>
          <Text style={styles.saleBadgeText}>20% OFF</Text>
        </View>
      </LinearGradient>

      {/* Product Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.productName}>{product.name}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <MaterialIcons
                key={star}
                name={star <= Math.floor(product.rating) ? 'star' : 'star-border'}
                size={16}
                color="#FFB800"
              />
            ))}
          </View>
          <Text style={styles.ratingText}>
            {product.rating} • {product.reviews} reviews
          </Text>
        </View>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.currentPrice}>₹{product.price}</Text>
          <Text style={styles.originalPrice}>₹{Math.round(product.price * 1.3)}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>Save ₹{Math.round(product.price * 0.3)}</Text>
          </View>
        </View>

        {/* Color Selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionLabel}>Select Color</Text>
          <View style={styles.colorGrid}>
            {product.colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorOptionSelected,
                ]}
                onPress={() => setSelectedColor(color)}
                activeOpacity={0.8}
              >
                {selectedColor === color && (
                  <MaterialIcons name="check" size={18} color={color === '#fff' ? '#333' : '#fff'} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.colorName}>
            {colorNames[selectedColor] || 'Selected'}
          </Text>
        </View>

        {/* Size Selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionLabel}>Select Size</Text>
          <View style={styles.sizeGrid}>
            {sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.sizeOptionSelected,
                ]}
                onPress={() => setSelectedSize(size)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextSelected,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quantity Selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionLabel}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Premium quality apparel designed for comfort and style. Made with 100% organic
            materials, this product is perfect for everyday wear or special occasions. Features
            excellent durability, breathable fabric, and a modern design that suits all body types.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.featureItem}>
            <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.featureText}>100% Premium Cotton</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.featureText}>Machine Washable</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.featureText}>Eco-Friendly</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.addToCartGradient}
          >
            <MaterialIcons name="shopping-cart" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={handleBuyNow}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#ff6b6b', '#ee5a6f']}
            style={styles.buyNowGradient}
          >
            <MaterialIcons name="flash-on" size={20} color="#fff" />
            <Text style={styles.buyNowText}>Buy Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  imageSection: {
    height: 300,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  saleBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saleBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  priceSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  discountText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  selectionContainer: {
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: '#333',
  },
  colorName: {
    fontSize: 12,
    color: '#666',
  },
  sizeGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeOption: {
    width: '23%',
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  sizeOptionSelected: {
    borderColor: '#667eea',
    backgroundColor: '#667eea',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sizeTextSelected: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 40,
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  addToCartButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  addToCartGradient: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buyNowGradient: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
