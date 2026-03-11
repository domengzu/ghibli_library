class Comment < ApplicationRecord
  belongs_to :user
  # belongs_to :ghibli_movie, class_name: "ghiblis", foreign_key: "ghibli_movie_id", primary_key: "movie_id"

  validates :ghibli_movie_id, presence: true
  validates :body, presence: true
end
