<template>
    <div class="review-detail">
      <!-- Title of the Review -->
      <h1 class="review-title">{{ review.title }}</h1>
  
      <!-- Review Content -->
      <p class="review-content">{{ review.content }}</p>
  
      <!-- Rating of the Review -->
      <p class="review-rating">
        <strong>Rating:</strong> {{ review.rating }} / 5
      </p>
  
      <!-- Date of Review -->
      <p class="review-date">
        <strong>Published On:</strong> {{ new Date(review.date).toLocaleDateString() }}
      </p>
  
      <!-- Back to Reviews Link -->
      <router-link to="/" class="back-to-reviews">Back to Reviews</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'ReviewDetail',
    setup() {
      const route = useRoute();
      const review = ref(null);
  
      // Fetch review details based on the ID from the URL
      onMounted(() => {
        axios
          .get(`http://localhost:1337/api/reviews/${route.params.id}`) // Ensure the endpoint matches your Strapi setup
          .then((response) => {
            review.value = response.data.data;
          })
          .catch((error) => {
            console.error('There was an error fetching the review:', error);
          });
      });
  
      return { review };
    },
  };
  </script>
  
  <style scoped>
  /* Container for the review details */
  .review-detail {
    width: 80%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
  }
  
  /* Review Title */
  .review-title {
    font-size: 32px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  /* Review Content */
  .review-content {
    font-size: 18px;
    color: #34495e;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  /* Review Rating */
  .review-rating {
    font-size: 16px;
    font-weight: 500;
    color: #2980b9;
    margin-bottom: 20px;
  }
  
  /* Review Date */
  .review-date {
    font-size: 16px;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  /* Back to Reviews Button */
  .back-to-reviews {
    font-size: 16px;
    color: #ffffff;
    background-color: #2980b9;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s ease;
  }
  
  .back-to-reviews:hover {
    background-color: #3498db;
  }
  </style>
  