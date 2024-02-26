//Create an aggregation pipeline to calculate statistics for products in MongoDB.
// Implement a function to execute the pipeline and return aggregated results like
// the total number of products, the average price, and the highest quantity.

const Product = require('./models/product');

/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
async function getProductStatistics() {
  try {
    const statistics = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          highestQuantity: { $max: '$quantity' }
        }
      }
    ]);

    if (statistics.length === 0) {
      throw new Error('No product statistics found.');
    }

    const { totalProducts, averagePrice, highestQuantity } = statistics[0];

    return {
      totalProducts,
      averagePrice: parseFloat(averagePrice.toFixed(2)), 
      highestQuantity
    };
  } catch (error) {
    console.error('Error calculating product statistics:', error.message);
    throw error;
  }
}


getProductStatistics()
  .then((result) => console.log('Product Statistics:', result))
  .catch((error) => console.error('Error:', error));
