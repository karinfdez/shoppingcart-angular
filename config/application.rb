require File.expand_path('../boot', __FILE__)

require 'rails/all'



# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Shocart
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
     config.active_record.raise_in_transactional_callbacks = true

    # config.action_mailer.delivery_method = :smtp
    # config.action_mailer.smtp_settings = {
    #   :port           => ENV['MAILGUN_SMTP_PORT'],
    #   :address        => ENV['MAILGUN_SMTP_SERVER'],
    #   :user_name      => ENV['MAILGUN_SMTP_LOGIN'],
    #   :password       => ENV['MAILGUN_SMTP_PASSWORD'],
    #   :domain         => ENV['MAILGUN_SMTP_DOMAIN'],
      

    #   :address        => ENV['CLOUDMAILIN_FORWARD_ADDRESS'],
    #   :user_name      => ENV['CLOUDMAILIN_USERNAME'],
    #   :password       => ENV['CLOUDMAILIN_PASSWORD'],
    #   :authentication => :plain,
    # }

    config.action_mailer.delivery_method= :smtp
    config.action_mailer.smtp_settings = {
      address: "smtp.gmail.com",
      port: 587,
      user_name: ENV['gmail_username'],
      password: ENV['gmail_password'],
      authentication: :plain,
      enable_starttls_auto: true
    }

    # Once I get the mailgun:
#     ActionMailer::Base.smtp_settings = {
#   :port           => ENV['MAILGUN_SMTP_PORT'],
#   :address        => ENV['MAILGUN_SMTP_SERVER'],
#   :user_name      => ENV['MAILGUN_SMTP_LOGIN'],
#   :password       => ENV['MAILGUN_SMTP_PASSWORD'],
#   :domain         => 'cart-project.herokuapp.com',
#   :authentication => :plain,
# }
# ActionMailer::Base.delivery_method = :smtp
    end
end
