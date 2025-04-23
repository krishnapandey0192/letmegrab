import { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    IconButton,
    Chip,
    Avatar,
    Tooltip,
    Alert,
    CircularProgress,
    Skeleton
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    SearchOff as SearchOffIcon
} from '@mui/icons-material';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('view');
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: ''
    });

    const categories = ['all', 'electronics', 'clothing', 'books', 'home'];

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            filterProducts();
        }
    }, [searchTerm, selectedCategory, products]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };

    const filterProducts = () => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        setFilteredProducts(filtered);
    };

    const handleView = (product) => {
        setSelectedProduct(product);
        setDialogType('view');
        setOpenDialog(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category
        });
        setDialogType('edit');
        setOpenDialog(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setDialogType('delete');
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${selectedProduct.id}`);
            setProducts(products.filter(p => p.id !== selectedProduct.id));
            setOpenDialog(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `https://fakestoreapi.com/products/${selectedProduct.id}`,
                formData
            );
            setProducts(products.map(p => p.id === selectedProduct.id ? response.data : p));
            setOpenDialog(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Loading Skeleton Component
    const LoadingSkeleton = () => (
        <TableRow>
            <TableCell>
                <Skeleton variant="rounded" width={40} height={40} />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" width="80%" />
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                <Skeleton variant="text" width="60%" />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" width="40%" />
            </TableCell>
            <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                </Box>
            </TableCell>
        </TableRow>
    );

    // Empty State Component
    const EmptyState = () => {
        if (initialLoad) return null;

        return (
            <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <SearchOffIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                        <Typography variant="h6" color="text.secondary">
                            No products found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {searchTerm
                                ? `No products match your search "${searchTerm}"`
                                : selectedCategory !== 'all'
                                    ? `No products found in category "${selectedCategory}"`
                                    : 'No products available'}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Products
                </Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <TextField
                        label="Search Products"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                    <TextField
                        select
                        label="Category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        sx={{ minWidth: { xs: '100%', sm: 200 } }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{
                        overflowX: 'auto',
                        '& .MuiTableCell-root': {
                            py: 1.5,
                            px: { xs: 1, sm: 2 }
                        }
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell sx={{ width: { xs: '80px', sm: '100px' } }}>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Category</TableCell>
                                <TableCell sx={{ width: { xs: '80px', sm: '100px' } }}>Price</TableCell>
                                <TableCell align="center" sx={{ width: { xs: '100px', sm: '120px' } }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                // Show loading skeletons
                                Array(5).fill(0).map((_, index) => (
                                    <LoadingSkeleton key={index} />
                                ))
                            ) : filteredProducts.length === 0 ? (
                                // Show empty state only after initial load
                                <EmptyState />
                            ) : (
                                // Show products
                                filteredProducts.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        hover
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Avatar
                                                src={product.image}
                                                alt={product.title}
                                                variant="rounded"
                                                sx={{
                                                    width: { xs: 40, sm: 56 },
                                                    height: { xs: 40, sm: 56 }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ display: { xs: 'block', sm: 'none' } }}
                                            >
                                                {product.category}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                            <Chip
                                                label={product.category}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                            >
                                                ${product.price}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: { xs: 0.5, sm: 1 }
                                            }}>
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleView(product)}
                                                        size="small"
                                                    >
                                                        <ViewIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit Product">
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => handleEdit(product)}
                                                        size="small"
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Product">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete(product)}
                                                        size="small"
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        {dialogType === 'view' && 'Product Details'}
                        {dialogType === 'edit' && 'Edit Product'}
                        {dialogType === 'delete' && 'Delete Product'}
                    </DialogTitle>
                    <DialogContent>
                        {dialogType === 'view' && selectedProduct && (
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                    <Avatar
                                        src={selectedProduct.image}
                                        alt={selectedProduct.title}
                                        variant="rounded"
                                        sx={{ width: 200, height: 200 }}
                                    />
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {selectedProduct.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {selectedProduct.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <Chip
                                        label={selectedProduct.category}
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Typography variant="h6" color="primary">
                                        ${selectedProduct.price}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {dialogType === 'edit' && (
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    margin="normal"
                                >
                                    {categories.filter(cat => cat !== 'all').map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        )}

                        {dialogType === 'delete' && (
                            <Box sx={{ mt: 2 }}>
                                <Alert severity="warning" sx={{ mb: 2 }}>
                                    Are you sure you want to delete this product? This action cannot be undone.
                                </Alert>
                                <Typography variant="body1">
                                    Product: {selectedProduct?.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {selectedProduct?.category}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        {dialogType === 'edit' && (
                            <Button
                                onClick={handleUpdate}
                                variant="contained"
                                color="primary"
                            >
                                Update
                            </Button>
                        )}
                        {dialogType === 'delete' && (
                            <Button
                                onClick={confirmDelete}
                                variant="contained"
                                color="error"
                            >
                                Delete
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default Products; 