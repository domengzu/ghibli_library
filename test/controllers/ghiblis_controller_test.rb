require "test_helper"

class GhiblisControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get ghiblis_index_url
    assert_response :success
  end

  test "should get show" do
    get ghiblis_show_url
    assert_response :success
  end
end
