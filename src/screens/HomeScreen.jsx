import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { productStore } from '../services/supabase';

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackProducts = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 599,
      rating: 4.5,
      reviews: 328,
      category: 'tshirt',
      image: 'https://via.placeholder.com/250x250?text=T-Shirt',
      colors: ['#000', '#fff', '#ff0000'],
    },
    {
      id: '2',
      name: 'Classic Denim Jeans',
      price: 1299,
      rating: 4.7,
      reviews: 456,
      category: 'jeans',
      image: 'https://via.placeholder.com/250x250?text=Jeans',
      colors: ['#0066cc', '#1a1a1a'],
    },
    {
      id: '3',
      name: 'Casual Polo Shirt',
      price: 799,
      rating: 4.6,
      reviews: 234,
      category: 'shirt',
      image: 'https://via.placeholder.com/250x250?text=Polo',
      colors: ['#fff', '#000', '#ff6b6b'],
    },
    {
      id: '4',
      name: 'Sports Hoodie',
      price: 1499,
      rating: 4.8,
      reviews: 512,
      category: 'hoodie',
      image: 'https://via.placeholder.com/250x250?text=Hoodie',
      colors: ['#000', '#333', '#666'],
    },
    {
      id: '5',
      name: 'Gym Shorts',
      price: 499,
      rating: 4.4,
      reviews: 189,
      category: 'shorts',
      image: 'https://via.placeholder.com/250x250?text=Shorts',
      colors: ['#000', '#0066cc', '#ff6b6b'],
    },
    {
      id: '6',
      name: 'Formal Blazer',
      price: 2499,
      rating: 4.9,
      reviews: 342,
      category: 'blazer',
      image: 'https://via.placeholder.com/250x250?text=Blazer',
      colors: ['#1a1a1a', '#4a4a4a'],
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productStore.getProducts();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(item => ({
            id: item.id?.toString() || Math.random().toString(),
            name: item.name || 'Untitled Product',
            price: item.price || 0,
            rating: item.rating || 0,
            reviews: item.reviews || 0,
            category: item.category || 'all',
            image: item.image || 'https://via.placeholder.com/250x250?text=Product',
            colors: item.colors || ['#000'],
          }));
          setProducts(normalized);
        } else {
          console.warn('No products from Supabase, using fallback data');
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.warn('Error loading products, using fallback:', error?.message);
        setProducts(fallbackProducts);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'All', icon: 'dashboard' },
    { id: 'tshirt', name: 'T-Shirts', icon: 'shopping-bag' },
    { id: 'jeans', name: 'Jeans', icon: 'shopping-bag' },
    { id: 'shirt', name: 'Shirts', icon: 'shopping-bag' },
    { id: 'hoodie', name: 'Hoodies', icon: 'shopping-bag' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#e0e0e0', '#f5f5f5']}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SALE</Text>
        </View>
      </LinearGradient>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={14} color="#FFB800" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews})
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.originalPrice}>₹{Math.round(item.price * 1.3)}</Text>
        </View>

        <View style={styles.colorContainer}>
          {item.colors.map((color, index) => (
            <View
              key={index}
              style={[
                styles.colorDot,
                { backgroundColor: color, borderColor: color },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#ff6b6b', '#ee5a6f']}
            style={styles.addToCartGradient}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLogoSection}>
            <Image
              source={require('../../src/assets/logo.jpeg')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.headerTitle}>VIDEH</Text>
              <Text style={styles.headerSubtitle}>Premium Apparel</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.cartIcon}>
          <MaterialIcons name="shopping-cart" size={28} color="#fff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>0</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={
                  selectedCategory === category.id
                    ? ['#ff6b6b', '#ee5a6f']
                    : ['#f0f0f0', '#e8e8e8']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.categoryGradient}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerContent: {
    flex: 1,
  },
  headerLogoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  cartIcon: {
    position: 'relative',
    paddingHorizontal: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: 4,
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  categoryWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  categoriesContainer: {
    paddingRight: 16,
    gap: 10,
  },
  categoryButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  categoryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
  },
  categoryButtonActive: {},
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  productCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  addToCartBtn: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  addToCartGradient: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default HomeScreen;
