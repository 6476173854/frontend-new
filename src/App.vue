<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-content">
        <h1 class="navbar-title">🎬 Movie Reviews</h1>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Reviews..."
          class="search-bar"
        />
      </div>
    </nav>

    <!-- Reviews Section -->
    <main class="reviews-container">
      <div v-if="filteredReviews.length" class="reviews-list">
        <div
          v-for="review in filteredReviews"
          :key="review.id"
          class="review-card"
        >
          <div v-if="review.image" class="review-image">
            <img
              v-if="review.attributes.image"
              :src="'http://localhost:1337/uploads/th_15b862ef60.jpg' + review.attributes.image.data.attributes.url"
              alt="Review"
              class="image"
            />
          </div>

          <h2 class="review-title">{{ review.title }}</h2>
          <p class="review-rating">⭐ Rating: {{ review.rating }} / 5</p>
          <p class="review-category">🎭 Category: {{ review.category || 'Uncategorized' }}</p>
          <p class="review-date">📅 Released: {{ new Date(review.date).toLocaleDateString() }}</p>
        </div>
      </div>

      <div v-else class="no-reviews">
        <p>No reviews found 😞</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Ankush Bansal. All Rights Reserved.</p>
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
      .get('http://localhost:1337/api/reviews')
      .then((response) => {
        this.reviews = response.data.data;
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  },
};
</script>

<style scoped>
/* General Reset */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f6f8;
  color: #333;
}

/* Navbar */
.navbar {
  background-color: #1e2a38;
  color: #fff;
  padding: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  color: #ffffff;
}

.search-bar {
  padding: 12px 16px;
  width: 280px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  outline: none;
  background-color: #ecf0f1;
}

/* Reviews Section */
.reviews-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.reviews-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.review-card {
  background-color: #eaf9fc;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.review-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.review-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.review-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.review-rating,
.review-category,
.review-date {
  font-size: 15px;
  margin-bottom: 6px;
  color: #555;
}

/* No Reviews */
.no-reviews {
  text-align: center;
  font-size: 18px;
  color: #e74c3c;
  padding: 40px 0;
}

/* Footer */
.footer {
  background-color: #1e2a38;
  color: #fff;
  text-align: center;
  padding: 24px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1000px;
  margin: auto;
}

.footer-link {
  color: #48c6ef;
  text-decoration: none;
  margin: 0 6px;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
