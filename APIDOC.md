# _jokebook_ API Documentation

## Endpoint 1 - Get categories

**Request Format:** `fetch("/jokebook/categories")`
**Request Type:** GET
**Returned Data Format**: [category1, category2, ..., categoryX]
**Description:** Returns an array of all the categories in the jokebook.
**Example Request:** `fetch("/jokebook/categories")`
**Example Response:**

```
[funnyJoke, lameJoke]
```

**Error Handling:** N/A

## Endpoint 2 - Get jokes from category

**Request Format:** `fetch("/jokebook/joke/:category")`
**Request Type:** GET
**Returned Data Format**: Array of jokes objects.
**Description:** Returns either all of the jokes from the category or the first x jokes where x is the optinal limit parameter.
**Example Request:** `fetch("/jokebook/joke/:category?limit=2")`
**Example Response:**

```
[
  {
    joke: 'Why did the student eat his homework?',
    response: 'Because the teacher told him it was a piece of cake!'
  },
  {
    joke: 'What kind of tree fits in your hand?',
    response: 'A palm tree'
  },
  {
    joke: 'What is worse than raining cats and dogs?',
    response: 'Hailing taxis'
  }
]
```

**Error Handling:** Will send back 400 status code if category doesn't exist.

## Endpoint 3 - Add new joke

**Request Format:** `fetch("/jokebook/joke/new")`
**Request Type:** POST
**Returned Data Format**: Array of jokes objects.
**Description:** Adds the new joke to the corresponding joke array and returns the new array.
**Example Request:** `fetch("/jokebook/joke/new")`
**Example Response:**

```
[
  {
    joke: 'Why did the student eat his homework?',
    response: 'Because the teacher told him it was a piece of cake!'
  },
  {
    joke: 'What kind of tree fits in your hand?',
    response: 'A palm tree'
  },
  {
    joke: 'What is worse than raining cats and dogs?',
    response: 'Hailing taxis'
  },
  {
      joke: 'New joke',
      response: 'New response'
  }
]
```

**Error Handling:** Will send back 400 status code if category doesn't exist or if the joke or response fields are blank.
