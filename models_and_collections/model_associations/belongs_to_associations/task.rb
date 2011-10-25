
# Setting up a belongs_to association in Backbone is a 2 step process

# Consider the association that may occur between a task and a user

# The end result of the approach is a Task instance having a property 
# called user where we store the associated User object

class Task < ActiveRecord::Base
  belongs_to :user
  
  def as_json(options = nil)
    super((options || {}).merge(include: { user: { only: [:name, :email] } }))
  end
  
end

# Continued... in tasks.js