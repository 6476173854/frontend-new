<template>
  <div id="app">
    <!-- Navigation bar -->
    <nav class="navbar">
      <div class="navbar-content">
        <h1 class="navbar-title">Review hub</h1>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Reviews..."
          class="search-bar"
        />
      </div>
    </nav>

    <!-- Reviews Section -->
    <div class="reviews-container">
      <div v-if="filteredReviews.length" class="reviews-list">
        <div
          v-for="review in filteredReviews"
          :key="review.id"
          class="review-card"
        >
          <!-- Display Review Image -->
          <div v-if="review.image" class="review-image">
            <img
            v-if="review.attributes.image"
            :src="'http://localhost:1337/uploads/th_15b862ef60.jpg' + review.attributes.image.data.attributes.url"
            alt="Review Image"
            class="review-image"
          />
          </div>

          <!-- Review Title and Content -->
          <h2 class="review-title">{{ review.title }}</h2>
          <p class="review-rating">Rating: {{ review.rating }} / 5</p>
          <p class="review-category">Category: {{ review.category || 'Uncategorized' }}</p>
          <p class="review-date">Released: {{ new Date(review.date).toLocaleDateString() }}</p>
          
        </div>
      </div>

      <!-- No reviews found message -->
      <div v-else class="no-reviews">
        <p>No reviews found!</p>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Ankush bansal. All Rights Reserved.</p>
        <p>
          <a href="https://www.example.com/privacy" class="footer-link">Privacy Policy</a> |
          <a href="https://www.example.com/terms" class="footer-link">Terms of Service</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      reviews: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter((review) =>
        review.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        review.category?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    axios
      .get('http://localhost:1337/api/reviews') // Your Strapi API endpoint
      .then((response) => {
        console.log('API Response:', response.data);  // Log response
        this.reviews = response.data.data; // Strapi's response structure
      })
      .catch((error) => {
        console.error('There was an error fetching the reviews:', error);
      });
  },
};
</script>

<style scoped>
/* Basic Styling */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f4f8; /* Light Background Color */
  color: #333;
}

/* Navbar Styling */
.navbar {
  width: 100%;
  background-color: #2c3e50; /* Dark Blue Background */
  color: white;
  padding: 20px 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-title {
  font-size: 28px;
  margin: 0;
  color: #ecf0f1; /* Light Color for the Navbar Title */
}

.search-bar {
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #ecf0f1; /* Light Grey Background for Input */
}

/* Reviews Section */
.reviews-container {
  width: 80%;
  max-width: 1200px;
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff; /* White Background for the Reviews Section */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.reviews-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.review-card {
  background-color: #63e4f5;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.review-title {
  font-size: 24px;
  font-weight: bold;
  color: #34495e; /* Dark Blue for Titles */
  margin-bottom: 10px;
}

.review-rating,
.review-category,
.review-date {
  font-size: 14px;
  color: #7f8c8d; /* Grey Color for Subtext */
}

.view-more-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
  text-decoration: none;
  color: #2980b9; /* Blue for "View More" Links */
}

.view-more-link:hover {
  text-decoration: underline;
}

.no-reviews {
  text-align: center;
  font-size: 18px;
  color: #e74c3c; /* Red for "No reviews found" message */
}

/* Footer Styling */
.footer {
  background-color: #2c3e50; /* Same Dark Blue as Navbar */
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 30px;
  position: relative;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-link {
  color: #2980b9; /* Blue Links in the Footer */
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

/* Image Styling */
.review-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}
</style>
