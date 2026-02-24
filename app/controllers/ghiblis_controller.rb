class GhiblisController < ApplicationController
  def index
    @data = GhibliapiClient.new.film_list
  end

  def show
    @film = GhibliapiClient.new.get_film(params[:id])
    render_not_found unless @film
  end

  private
  def render_not_found
    render plain: "Film not found", status: :not_found
  end
end
