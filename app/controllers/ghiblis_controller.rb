class GhiblisController < ApplicationController
  def index
    @data = GhibliapiClient.new.film_list
    film_ids = @data.map { |film| film["id"] }
    @comments_count = Comment.where(ghibli_movie_id: film_ids).group(:ghibli_movie_id).count
  end

  def show
    @film = GhibliapiClient.new.get_film(params[:id])
    @film = JSON.parse(@film.body) if @film
    render_not_found unless @film

    @comments = Comment.where(ghibli_movie_id: params[:id]).order(created_at: :desc).includes(:user)
    @comment = user_signed_in? ? current_user.comments.new(ghibli_movie_id: params[:id]) : Comment.new
  end

  private
  def render_not_found
    render plain: "Film not found", status: :not_found
  end
end
