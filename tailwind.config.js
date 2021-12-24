module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
  ],
  purge: {
    enabled: true,
    content: [
      './**/*.html'
    ]
  }
}
