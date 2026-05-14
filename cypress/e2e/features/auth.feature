Feature: Smart Login System

  Scenario: User signup successfully
    Given I open the signup page
    When I enter signup details
    And I click the signup button
    Then signup should be successful

  Scenario: User login successfully
    Given I open the login page
    When I enter valid login credentials
    And I click the login button
    Then I should redirect to home page

  Scenario: Invalid login attempt
    Given I open the login page
    When I enter invalid login credentials
    And I click the login button
    Then I should see login error message
