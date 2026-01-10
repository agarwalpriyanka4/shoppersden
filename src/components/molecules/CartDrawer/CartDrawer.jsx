import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../CartContext/CartContext.jsx";

export default function CartDrawer({ open, onClose }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 350,
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* 🔝 HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2
          }}
        >
          <Typography variant="h6">Your Cart</Typography>

          {/* ❌ Close Button */}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* 🛒 CART ITEMS */}
        <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
          {cartItems.length === 0 ? (
            <Typography>No items in cart</Typography>
          ) : (
            cartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography>${item.price}</Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <IconButton onClick={() => updateQuantity(item.id, -1)}>
                    <RemoveIcon />
                  </IconButton>

                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>

                  <IconButton onClick={() => updateQuantity(item.id, 1)}>
                    <AddIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Divider />

        {/* 🔽 FOOTER */}
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Total: ${totalPrice.toFixed(2)}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>

          {/* Optional Close Button */}
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
