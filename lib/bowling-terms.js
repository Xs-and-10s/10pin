var TERMS = {

    'frames' : {

        'modes' : {

            'regular' : {
                   begin : 0,
                  length : 10,
              'modifier' : true,
                'throws' : {
                    max : 2,
                    min : 1
                }
            },
            'special' : {
                   begin : 10,
                  length : 1,
              'modifier' : false,
                'throws' : {
                    max : 2,
                    min : 0
                }
            }
         },

        'modifier' : 'throws',

        patterns : {
            delimiter : '-',
            'modes' : {
                'regular' : {
                    types : {
                          'open' : /^([0-9]{1})([0-9]{1})$/,
                         'spare' : /^([0-9]{1})[\/]{1}$/,
                        'strike' : /^([X]{1})$/
                    }
                },
                'special' : /^([0-9]|[X])([0-9]|[X])$/
            }
        },

        'points' : {
            max : 30,
            min : 0
        },

        'throws' : {
            max : 2,
            min : 0
        },

        'types' : {

              'open' : {
                'modifier' : 0,
                  'throws' : 2
              },

             'spare' : {
                'modifier' : 1,
                  'throws' : 2
             },

            'strike' : {
                'modifier' : 2,
                  'throws' : 1
            }
         }
    },

    'game' : {

        'frames' : {
            max : 11,
            min : 10,
            'modes' : {
                'regular' : {
                    max : 10,
                    min : 10
                },
                'special' : {
                    max : 1,
                    min : 0
                }
            }
        },
         'score' : {
            max : 300,
            min : 0
         },
        'throws' : {
            max : 21,
            min : 12
        }
    },

    'points' : {
        valueOf : 1
    },

    'score' : {

        sumOf : 'points'
    },

    'throws' : {
        mapping : {
            'X' : function () {
                return 10
            },
            '/' : function (first) {
                return 10 - first
            }
        },
        'points' : {
            max : 10,
            min : 0
        }
    }
}
module.exports = TERMS


