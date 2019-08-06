'use strict'

var difference = require('array-differ')
var toString = require('nlcst-to-string')
var search = require('nlcst-search')
var position = require('unist-util-position')
var quote = require('quotation')
var fillers = require('fillers')
var hedges = require('hedges')
var weasels = require('weasels')
var jargons = require('jargon')
var unique = require('arr-union')

module.exports = intensify

var list = unique([], fillers, hedges, weasels, jargons).sort()

var source = 'retext-intensify'

// Types.
var filler = 'filler'
var hedge = 'hedge'
var weasel = 'weasel'
var jargon = 'jargon'

// Reasons.
var reason = {}

reason[filler] = 'it doesn’t add meaning'
reason[weasel] = 'it’s vague or ambiguous'
reason[hedge] = 'it lessens impact'
reason[jargon] = 'could be perceived as too formal or complex'

// Attacher.
function intensify(options) {
  var ignore = (options || {}).ignore || []
  var phrases = difference(list, ignore)

  return transformer

  // Search `tree` for validations.
  function transformer(tree, file) {
    search(tree, phrases, searcher)

    function searcher(match, index, parent, phrase) {
      var type = jargon
      var actual = toString(match)
      var message

      if jargons.indexOf(phrase) === -1) {
        type = weasel

        if (weasels.indexOf(phrase) === -1) {
          type = fillers.indexOf(phrase) === -1 ? hedge : filler
        }
      }

      if type == jargon {
        message = file.message(
          quote(actual, '`') + ' ' + reason[type],
          {
            start: position.start(match[0]),
            end: position.end(match[match.length - 1])
          },
          [source, type].join(':')
        )
      }
      else {
        message = file.message(
          'Don’t use ' + quote(actual, '`') + ', ' + reason[type],
          {
            start: position.start(match[0]),
            end: position.end(match[match.length - 1])
          },
          [source, type].join(':')
        )
      }

      message.actual = actual
      message.expected = []
    }
  }
}
