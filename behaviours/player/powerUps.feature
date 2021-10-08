Feature: Power Ups effects
#I want to see clearly what power ups are and what do they do to my character

    Scenario: Dash
    Given the 'Dash' icon is on screen
    When my 'character' takes the 'Dash' icon
    And press the 'shift' key
    And my 'character' is looking to the left
    Then my 'character' moves X gameObjects to the left
    But not if there is a solid gameObject in the way.

    Scenario Outline: Grow and Shrink
    Given the <Icon> icon is on screen
    When my 'character' takes the <Icon> Icon
    Then my 'character' will <Effect> in size
      Examples:
          |  Icon   |  Effect  | 
          | Grow    |  grow    |
          | Shrink  |  shrink  |
      
    Scenario: Barrier
    Given the Barrier icon is on screen
    When my 'character' takes the Barrier icon
    Then my 'character' will have a shield
    And it will protect my 'character' from damage once

    Scenario: Double Jump
    Given the 'Double-jump' icon is on screen
    When my 'character' takes the 'Double-jump' icon
    And I press the 'spacebar' key twice
    Then my 'character' will jump twice

    #not sure if it will be here
    Scenario: Tele-Swap
    Given 'character1' and 'character2' are in game
    And the 'Tele-Swap' icon is on screen
    When 'character1' walks into the 'Tele-Swap' icon
    Then the 'Tele-Swap' will be removed from screen
    And the characters will swap positions

    Scenario: Ghost
    Given the 'Ghost' icon is on screen
    When my 'character' takes the 'Ghost' icon
    Then my 'character' will be able to see 'ghost-blocks'
    And 'ghost-blocks' will be solid for my 'character'



