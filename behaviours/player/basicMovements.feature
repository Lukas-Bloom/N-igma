Feature: Basic Movements

I want to understand the basic movements of my character

    Scenario Outline:  Basic
      Given my 'character' is on the ground
      When I press the key <Key>
      Then my 'character' will <Move>

      Examples:
          |   Key     |  Move  | 
          |   left    |  left  |
          |   right   |  right |
          | spacebar  |  jump  |

