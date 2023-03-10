class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  scope :all_except, ->(user) { where.not(id: user) }
  after_create_commit { broadcast_append_to 'users' }
  after_update_commit { broadcast_update }
  has_many :messages
  has_one_attached :avatar
  has_many :joinables, dependent: :destroy
  has_many :joined_rooms, through: :joinables, source: :room

  enum role: %i[user admin]
  enum status: %i[offline away online]

  after_commit :add_default_avatar, on: %i[create update]

  after_initialize :set_default_role, if: :new_record?

  attr_accessor :current_password

  def chat_avatar
    avatar.variant(resize_to_limit: [48, 48]).processed
  end

  def broadcast_update
    broadcast_replace_to 'user_status', partial: 'users/status', user: self
  end

  def status_to_css
    case status
    when 'online'
      'status-online'
    when 'away'
      'status-away'
    when 'offline'
      'status-offline'
    else
      'status-offline'
    end
  end

  private

  def set_default_role
    self.role ||= :user
  end

  def add_default_avatar
    return if avatar.attached?

    avatar.attach(
      io: File.open(Rails.root.join('app', 'assets', 'images', 'default_avatar.png')),
      filename: 'default_avatar.png',
      content_type: 'image/png'
    )
  end
end
