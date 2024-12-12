# Buddhist Focus

A web application dedicated to mindfulness and Buddhist teachings through interactive exercises and daily practices. This platform offers daily teachings, meditation timers, and practical applications of Buddhist wisdom in modern life.

## Features

### 1. Daily Teachings
- Random teaching generator with practical applications
- Categorized Buddhist wisdom
- Comprehensive collection of quotes and practices
- Multi-tradition teachings (Theravada, Mahayana, Zen)

### 2. Interactive Features
- Meditation timer with interval bells
- Personal reflection journal
- Category-based exploration
- Progress tracking

### 3. Practice Categories
- Mindfulness
- Compassion
- Wisdom
- Meditation
- Four Noble Truths
- Noble Eightfold Path
- Five Aggregates
- Stress Relief
- Daily Life Practice
- Beginner's Guide

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/buddhist-focus.git
cd buddhist-focus
```

2. No additional installation required - this is a static website that runs entirely in the browser.

## Usage

### Local Development
1. Open `index.html` in your web browser
2. Or use a local server:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

### GitHub Pages Deployment
The site is automatically deployed to GitHub Pages when pushing to the main branch.
Visit: `https://neuralbloom.github.io/buddhist-focus`

## File Structure
```
buddhist-focus/
├── index.html              # Main application page
├── styles/
│   └── main.css           # Custom styles
├── js/
│   ├── app.js             # Core application logic
│   └── meditation.js      # Meditation timer functionality
├── data/
│   └── teachings.json     # Database of teachings
└── sounds/
    └── meditation-bell.mp3 # Timer sounds
```

## Customization

### Adding New Teachings
1. Open `data/teachings.json`
2. Add new entries following the existing format:
```json
{
  "quote": "Your quote here",
  "source": "Source name",
  "practice": "Practice suggestion"
}
```

### Modifying Categories
1. Add new categories in `teachings.json`
2. Follow the existing structure for consistency
3. Update the category list in `app.js` if needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Guidelines
1. Ensure quotes and teachings are accurately attributed
2. Include practical applications with each teaching
3. Maintain the existing code structure
4. Test all features before submitting
5. Update documentation as needed

### Development Process
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Buddhist teachings from various traditions
- Modern mindfulness practices
- Community contributions
- Open source libraries and tools used

## Support

- For bugs and features, please open an issue
- For other questions, reach out through GitHub Discussions

## Future Plans

- [ ] Add more traditional teachings
- [ ] Implement user accounts
- [ ] Create a mobile app version
- [ ] Add guided meditation recordings
- [ ] Expand practice tracking features
- [ ] Include community features

## Security

- No sensitive data is collected
- All data is stored locally in the browser
- No external dependencies besides specified CDN resources

## Version History

- 1.0.0: Initial release with core features
- 1.1.0: Added meditation timer
- 1.2.0: Added practice tracking
- 1.3.0: Expanded teachings database

## Additional Resources

- [Buddhism Basics](https://www.buddhist-focus.com/basics)
- [Meditation Guide](https://www.buddhist-focus.com/meditation)
- [Practice Tips](https://www.buddhist-focus.com/tips)

*Note: This is an open-source project dedicated to sharing Buddhist wisdom. All teachings are shared with respect to their original sources and traditions.*
