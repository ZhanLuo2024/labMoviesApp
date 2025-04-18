import React, { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, CircularProgress, Alert, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

interface Review {
  MovieId: string;
  ReviewId: string;
  Content: string;
  ReviewDate: string;
  ReviewerId: string;
}

const MyReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // dialog 狀態
  const [editOpen, setEditOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const token = localStorage.getItem("token");

  const currentUserId = localStorage.getItem("userId") || "";

  // const [editSuccess, setEditSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token || !currentUserId) {
      navigate("/login");
    }
  }, [token, currentUserId, navigate]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        "https://qnjz5iq9m9.execute-api.eu-west-1.amazonaws.com/prod/movies/reviews/123"
      );
      const all = res.data.reviews || [];
      const mine = all.filter((r: Review) => r.ReviewerId === currentUserId);
      setReviews(mine);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setEditContent(review.Content);
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editingReview) return;

    try {
      await axios.put(
        `https://qnjz5iq9m9.execute-api.eu-west-1.amazonaws.com/prod/movies/reviews/${editingReview.MovieId}/${editingReview.ReviewId}`,
        { content: editContent },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      setEditOpen(false);
      setEditingReview(null);
      await fetchReviews();
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Failed to update review.");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Reviews
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {reviews.map((review) => (
        <Card key={review.ReviewId} sx={{ mb: 2, position: "relative" }}>
          <CardContent>
            <Typography variant="h6">Movie ID: {review.MovieId}</Typography>
            <Typography variant="body2" gutterBottom>
              {review.Content}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(review.ReviewDate).toLocaleDateString()}
            </Typography>
            <IconButton
              onClick={() => handleEditClick(review)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <EditIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}

      {!loading && reviews.length === 0 && (
        <Typography variant="body2">You haven’t written any reviews yet.</Typography>
      )}

      {/* Dialog 編輯視窗 */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>Edit Your Review</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyReviewsPage;
