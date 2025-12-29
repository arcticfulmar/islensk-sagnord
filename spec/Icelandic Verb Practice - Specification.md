# Icelandic Verb Practice - Specification

A web-based flashcard tool that allows users to look at a list of infinitve forms (e.g. að vera) of Icelandic Verbs (sagnorð). 


## Main page / Overview

A set of verbs are shown as a grid of tiles on desktop layout and a list of tiles on phone layout. The verbs are shown in their infinitive form. When a user clicks on a verb tile, they see a page specifically for the verb they clicked on. Each verb has their own page with the same layout for each. See **Verb conjugation page** for details.

Each verb is loaded from a corresponding verb JSON file. See **Verb JSON data** for details on how to fetch this data. 

## Verb difficulty

On each overview tile, use an emoji to represent the **difficulty level** of the verb. Difficulties range from 1-5 with 1 being easy. If the difficulty is not specified, use the **group** value of the verb instead. A smiley emoji can be used for difficulty 1, a raised eyebrow emoji for level 3, and an angry/unhappy emoji for difficulty 5.


## Verb conjugation page

This page is accessed when the user clicks/taps a verb tile on the main page. The data for the verb is loaded from a corresponding verb JSON file. See **Verb JSON data** for details.

The verb is shown in infinitive form in Icelandic and English as the title of the verb page, e.g. "að vera - to be". The title should be centered and bold but not wrap on mobile.

Below the title is a subheading showing the **verb group level** (from the JSON data) and **difficulty emoji** (see **Verb difficulty**), e.g. "Group 1  :-)".

Below the title are two buttons. One button is called "Æfa mig!" that when clicked will take the user to the corresponding **Verb practice page**. See **Verb practice page** for details. The other button is called "Til baka" and takes the user back to the overview page.

Shown on the verb conjugation page are three sections: Nùtið, Þátið and Lysingaháttur Þátiðar.

The Nùtið and Þátið sections are a collapsed list/grid of pronouns with hidden verb conjugations. The user can tap/click on these section headings to expand the list/grid. Hidden conjugations can be tapped/clicked to reveal them. A revealed conjugation can be tapped again to hide it. For example:


```
Nútið

- Ég                [    -   ]
- Þú                [    -   ]
- Við               [  erum  ]  <-- Example: This was tapped and therefore shown
- Hann/Hún/Þáð      [    -   ]
- ...
```

```
Þátið 

- Ég                [    -   ]
- Þú                [  varst ]  <-- Example: This was tapped and therefore shown
- Við               [    -   ]
- Hann/Hún/Þáð      [    -   ]
- ...
```

The "Lysingaháttur Þátiðar" section has just one entry/tile because it's the same conjugation for all forms:

```
Lysingaháttur Þátiðar

- Ég hef, Þú hefur, ...   [    -    ]
```

## Verb practice page

This page is accessed when the user clicks/taps on the "Æfa mig!" button on the verb conjugation page. It shows a randomly generated list/grid of pronouns and tenses with tiles for a user to practice.

The data for the verb is loaded from a corresponding verb JSON file. See **Verb JSON data** for details.

The verb is shown in infinitive form in Icelandic and English as the title of the verb page, e.g. "að vera - to be".

Below the title are two buttons. One button is called "Nytt!" that when clicked will regenerate a new set of random entries (see below for details).  The other button is called "Til baka" and takes the user back to the corresponding **verb conjugation page**.


The content of the page is a randomly generated list/grid of pronouns with tenses, e.g. 

```
- Ég                [   -   ] (nútið)
- Við               [   -   ] (þátið)
- Þú hefur          [   -   ] (l.þ.)
- Hann              [   -   ] (nútið)
```

Just like the **verb conjugation page**, the user can tap on a tile to show the hidden answer or tap a shown answer again to hide.


## Verb JSON data

Each verb has a JSON file with a standard schema that holds all the data that will be shown on the verb conjugation and practice pages. I envisage the layout to be something like:

```
{
    "íslensku": "að vera",
    "ensku": "to be",
    "difficulty": 0,
    "group": 1,
    "nútið": [
        {
            "pronoun": "Ég",
            "conjugation": "er"
        },
        {
            "pronoun": "Þú",
            "conjugation": "ert"
        }
    ],
    "þátið": [
        {
            "pronoun": "Ég",
            "conjugation": "var"
        },
        {
            "pronoun": "Þú",
            "conjugation": "varst"
        }
    ],
    "lþ": {
        "conjugation": "verið",
        "pronouns": [
            "Ég hef",
            "Þú hefur",
            "Við hofum"
        ]
    }
}
```

Note that the schema for nútið and þátið is regular, and lþ is unique. This is because lþ has the same conjugation for all pronouns, and pronouns are provided for the verb practice page random generation.


## Architecture

This should be a simple nodejs web application using express and minimal dependencies that can be easily hosted on a website.

The front-end should use React with reused components across all pages (overview, conjugation and practice).

The design should be very clean and flat with bold primary colors. It should have responsive design that works in grid format on desktop and list format on mobile.

There is **no requirement** to back the data in a database or in local browser storage at this stage.


## Follow up

- The "Lysingaháttur Þátiðar" entry on the **verb conjugation** page is too cramped. It just needs to show one of the possible pronouns from the JSON rather than all of them.

- In the **verb practice** page, the `(n.)` `(þ.)` are a little confusing for new learners. Please use the full words `(nútið)` and `(þátið)` instead. `(l.þ)` can remain.

- In both **verb conjugation** and **verb practice** pages, please color the revealed tiles according to nútið (it can remain blue), þátið (change to brown) and Lysingaháttur Þátiðar (orange).

- Add subheadings to the **verb conjugation** and **verb practice** pages so that the user knows what page they're on!

- Add the Group and Emoji from the **verb conjugation** page to the **verb practice page** also, in exactly the same style.

- There's a moment when clicking on a revealed tile to hide it where a "-" (hyphen) is shown. Can that be removed?

- I've had an idea for practice mode to add emojis to represent tense. If it's a nútið entry, please use a down arrow emoji or something to represent "now". If it's a þátið entry, please use a clock arrow or something to represent "then/past". If it's lþ, please use a thumbs up emoji or something to represent "complete".

- On the verb practice page, please add a third button on the left called "Reveal!" (in Icelandic :) and toggle all tiles in all sections on this page to be shown.

- On the verb conjugation page Lysingarháttur þátiðar tile, change it so that instead of "Ég hef, ..." it shows a random entry from the lþ pronouns array. It's always the same answer in the tile.

- I like that you've highlighted the current selection. Can you make the buttons all have the same width so that it looks a little more like a grid of buttons? I just asked you to apply it but it didn't seem to work. What I'm looking for is like this, with all buttons the same width:

```
[  Sýna allt  ]   [    Nýtt!    ]  [   Til baka    ]
[  Nútið   ]   [   þátið    ]   [   Random   ]
```

While you're at it, please change the bottom three buttons to be a little less obvious. Perhaps the grey of the unselected options could be lighter?  Can you also make the blue of the selected filter in verb practice to be as subtle as the grey?  Please change the button text to "Only nútið" and "Only þátið". Please also make these Icelandic words, not english (including Random).




## Verbs

Please create JSON entries for the following verbs. Any verbs not on this list can have the example JSON file removed.

Group 1: Labba, elda, skrifa, vakna, hlusta
Group 2: Breyta, reyna, segja, skipta, sækja
Group 3: Brjóta, drekka, ganga, vinna, bíða, geta, skilja, sofa
Group 4: Fá
Group 5: Fara
Ungrouped: Eiga, þurfa, vera, vita, hafa.

You can use `null` for the "group" value in JSON, or just don't include it. Update the code to support this, so that null or missing shows "Ungrouped" in the UI.

Please make ungrouped verbs have **difficulty** 5.