import { Button, Textarea } from "@heroui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { REVIEW_KEY } from "../../constants/query-key";
import { useAuth } from "../../hooks/useAuth";
import { axiosInstance } from "../../lib/axios.config";
import { getReviewsByProductId } from "../../service/review.service";

export function CustomerReviews({ productId }) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: reviews,
    isFetching,
    error,
  } = useQuery({
    queryKey: [REVIEW_KEY, productId],
    queryFn: () => getReviewsByProductId(productId),
  });
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReview, setEditedReview] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const navigate = useNavigate();

  const handleAddReview = async () => {
    // Ensure the rating is a number
    const numericRating = Number(rating);

    if (!newReview.trim() || numericRating <= 0 || numericRating > 5) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Review",
        text: "Please add a comment and a rating between 1 and 5 before submitting.",
        position: "top-end", // Positioning in the top-right corner
        showConfirmButton: false, // No button will be shown
        timer: 3000, // Optional: auto close after 3 seconds
      });
      return;
    }

    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "You are not logged in!",
        text: "Please login and then add a review.",
        position: "top-end",
        showCancelButton: true, // Show cancel button
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location.pathname } });
        }
      });
      return;
    }

    const newReviewData = {
      product_id: productId,
      rating: numericRating || 0,
      comment: newReview,
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/user/add/review?request-id=1234",
        newReviewData
      );

      if (response.status === 201) {
        setNewReview("");
        setRating(0);
        queryClient.invalidateQueries([REVIEW_KEY, productId]);
        Swal.fire({
          icon: "success",
          title: "Review Added!",
          position: "top-end", // Positioning in the top-right corner
          showConfirmButton: false, // No button will be shown
          timer: 3000, // Optional: auto close after 3 seconds
        });
      }
    } catch (error) {
      console.error("Error adding review:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting your review. Please try again later.",
        position: "top-end", // Positioning in the top-right corner
        showConfirmButton: false, // No button will be shown
        timer: 3000, // Optional: auto close after 3 seconds
      });
    }
  };

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditedReview(review.comment);
    setEditedRating(review.rating);
  };

  const handleUpdateReview = async () => {
    if (!editedReview.trim() || editedRating <= 0 || editedRating > 5) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Input",
        text: "Please provide a valid rating (1-5) and comment.",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const formattedData = {
      review_id: Number(editingReviewId),
      rating: Number(editedRating),
      comment: editedReview,
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/user/update/review?request-id=1234",
        formattedData
      );

      if (response.status === 200) {
        setEditingReviewId(null);
        queryClient.invalidateQueries([REVIEW_KEY, productId]);
      }
    } catch (error) {
      console.error("Error updating review:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while updating your review.",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  if (isFetching) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error.message}</div>;
  }

  return (
    <div className="space-y-16">
      {/* Add Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          {/* Star Rating */}
          <div className="flex items-center space-x-2">
            <span className="font-roboto text-lg">Rating:</span>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-600" : "text-gray-300"
                  } transition duration-200 hover:text-yellow-600`}>
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Input */}
          <div className="relative w-full">
            <Textarea
              placeholder="Share your thoughts..."
              variant="bordered"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button color="primary" onPress={handleAddReview}>
              Submit Review
            </Button>
          </div>
        </div>
      </div>

      {/* Display Reviews */}
      <div>
        <h1 className="font-roboto text-2xl font-semibold">Reviews and Ratings</h1>
        <div className="space-y-4 md:space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="relative space-y-[1px] rounded-lg p-[10px] shadow sm:space-y-1 md:space-y-2 md:p-3 lg:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{review?.reviewer_name}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.time_frame).toLocaleDateString()}
                    </p>
                  </div>
                  {isAuthenticated && (
                    <button onClick={() => handleEditClick(review)}>
                      <FaEdit className="cursor-pointer text-lg text-gray-500 hover:text-yellow-500" />
                    </button>
                  )}
                </div>

                {editingReviewId === review.id ? (
                  // Edit Mode
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setEditedRating(star)}
                          className={`text-2xl ${
                            editedRating >= star ? "text-yellow-500" : "text-gray-400"
                          } transition duration-200 hover:text-yellow-500`}>
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={editedReview}
                      onChange={(e) => setEditedReview(e.target.value)}
                      className="bg-base-200 min-h-[100px] w-full resize-none rounded-xl border px-4 py-3 dark:bg-white"
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={handleUpdateReview}
                        className="rounded-md bg-green-500 px-3 py-1 text-white transition duration-300 hover:bg-green-600">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="rounded-md bg-gray-400 px-3 py-1 text-white transition duration-300 hover:bg-gray-500">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-2xl ${
                            review.rating >= star ? "text-yellow-500" : "text-gray-400"
                          }`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{review?.comment}</p>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
