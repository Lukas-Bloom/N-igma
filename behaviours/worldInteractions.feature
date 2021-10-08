

Scenario: Slime
Given there is 'Slime' on the ground
When my 'character' walks on 'Slime'
Then the 'movement-speed' is reduced by 50%
And the 'jump-height' is reduced by 50%

Scenario: Slime
Given there is 'Slime' on the ground
When my 'character' walks on 'Slime'
Then the 'movement-speed' is reduced by 50%
And the 'jump-height' is reduced by 50%


#review it
Scenario: Ice
Given there is 'Ice' on the ground
When my 'character' walks on 'Ice'
Then my 'character' will continue to slide for 1 second even if I press/release a 'movement-key'
When standing still my 'character' has no horizontal momentum when jumping
