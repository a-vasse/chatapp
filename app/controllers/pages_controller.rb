class PagesController < ApplicationController
  before_action :redirect_user, only: :home

  def home
  end

  private

  def redirect_user
    redirect_to rooms_path if current_user
  end
end
