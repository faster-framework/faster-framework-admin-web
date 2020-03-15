export default {
  define: {
    BASE_API: process.env.MOCK  ? '/mock' : 'http://127.0.0.1:8080/admin',
  }
};
