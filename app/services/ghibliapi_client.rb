class GhibliapiClient
  BASE_URL = ENV.fetch("API_BASE_URL")

  def initialize
    @conn = Faraday.new(url: BASE_URL, request: { timeout: 5, open_timeout: 2 }) do |faraday|
      faraday.response :raise_error
      faraday.adapter Faraday.default_adapter
    end
  end

  def get_film(id)
    @conn.get("films/#{id}")
  end

  def film_list
    get_json("films")
  end

  private

  def get_json(path, params = {})
    response = @conn.get(path, params)
    JSON.parse(response.body)
  rescue Faraday::ResourceNotFound => e
    Rails.logger.error("GhibliAPI 404: #{e.message}")
    nil
  rescue Faraday::Error => e
    Rails.logger.error("GhibliApiClient error:#{e.class} - #{e.message}")
    nil
  rescue Faraday::ParseError => e
    Rails.logger.error("GhibliApiClient JSON parse error: #{e.message}")
    nil
  end
end
