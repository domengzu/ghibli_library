class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment_for_owner, only: [ :update, :destroy ]

  def create
    @comment = current_user.comments.new(comment_params)
    @comment.ghibli_movie_id = params[:ghibli_id]
    if @comment.save
      redirect_to ghibli_path(params[:ghibli_id]), notice: "Comment created successfully."
    else
      @film = GhibliapiClient.new.get_film(params[:ghibli_id])
      @film = JSON.parse(@film.body) if @film
      @comments = Comment.where(ghibli_movie_id: params[:ghibli_id]).order(created_at: :desc).includes(:user)
      render "ghiblis/show", status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      redirect_to ghibli_path(@comment.ghibli_movie_id), notice: "Comment updated successfully."
    else
      redirect_to ghibli_path(@comment.ghibli_movie_id), alert: "Failed to update comment."
    end
  end

  def destroy
    movie_id = @comment.ghibli_movie_id
    @comment.destroy
    redirect_to ghibli_path(movie_id), notice: "Comment deleted successfully."
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def set_comment_for_owner
    @comment = current_user.comments.find(params[:id])
  end
end
