import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import all coffee images
import coffee1 from '../assets/images/cofee1.webp';
import coffee2 from '../assets/images/cofee2.webp';
import coffee3 from '../assets/images/cofee3.webp';
import coffee4 from '../assets/images/cofee4.jpg';
import coffee5 from '../assets/images/cofee5.webp';
import coffee6 from '../assets/images/cofee6.jpg';
import coffee7 from '../assets/images/cofee7.webp';
import coffee8 from '../assets/images/cofee8.webp';
import coffee9 from '../assets/images/cofee9.webp';
import coffee10 from '../assets/images/cofee10.webp';
import coffee11 from '../assets/images/cofee11.webp';
import coffee12 from '../assets/images/cofee12.jpg';
import coffee13 from '../assets/images/cofee13.png';
import coffee14 from '../assets/images/cofee14.webp';

const images = [
    coffee1,
    coffee2,
    coffee3,
    coffee4,
    coffee5,
    coffee6,
    coffee7,
    coffee8,
    coffee9,
    coffee10,
    coffee11,
    coffee12,
    coffee13,
    coffee14
];

const LandingPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');
    const navigate = useNavigate();

    // Auto slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setSlideDirection('right');
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const nextImage = () => {
        setSlideDirection('right');
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSlideDirection('left');
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Container>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to LetMeGrab
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Your one-stop shop for all your needs
                </Typography>

                {/* Image Carousel */}
                <Box sx={{
                    position: 'relative',
                    mt: 4,
                    mb: 4,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    height: '400px'
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden'
                    }}>
                        {images.map((image, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    transition: 'transform 0.5s ease-in-out',
                                    transform: index === currentImage
                                        ? 'translateX(0)'
                                        : index < currentImage
                                            ? 'translateX(-100%)'
                                            : 'translateX(100%)',
                                    opacity: index === currentImage ? 1 : 0,
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                    <Button
                        onClick={prevImage}
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.7)'
                            }
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={nextImage}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.7)'
                            }
                        }}
                    >
                        Next
                    </Button>
                </Box>

                {/* Featured Products Section */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Featured Products
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Discover our latest and greatest products
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/products')}
                    >
                        View All Products
                    </Button>
                </Box>

                {/* About Section */}
                <Box sx={{ mt: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We are committed to providing the best shopping experience for our customers.
                        Our platform offers a wide range of products at competitive prices.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LandingPage; 