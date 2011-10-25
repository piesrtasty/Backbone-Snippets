# You can take a similar approach to that used for a "belongs_to" association except that
# the object's property will be a Backbone collection instead of a Backbone model

# Consider a scenario where we need access to a user's tasks


class User < ActiveRecord::Base
  has_many :tasks
  
  def as_json(options = nil)
    super((options || {}).merge(include: { tasks: { only: [:body, :due_date] } }))
  end

end

# Continuted in user.js ...