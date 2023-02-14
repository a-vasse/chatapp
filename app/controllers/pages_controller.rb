class PagesController < ApplicationController
  before_action :redirect_user, only: :home
  after_action :set_status

  def home
  end

  private

  def redirect_user
    redirect_to rooms_path if current_user
  end

  def set_status
    # current_user.update(status: User.statuses(:offline)) if current_user
    current_user&.update(status: User.statuses(:offline))
  end
end
