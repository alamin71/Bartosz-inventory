const questionsData = [
  {
    id: "1",
    hidden: false,
    question: "1",
    options: ["TRUE", "FALSE"],
    start: true,
    type: "next",
    answer: {
      "TRUE": [
        {
          id: "1.1",
          question: "1-1",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "1.1.1",
                question: "1-1-1",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.1.2",
                question: "1-1-2",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.1.3",
                question: "1-1-3",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: true,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "1.2",
          question: "1-2",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "1.2.1",
                question: "1-2-1",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.2.2",
                question: "1-2-2",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.2.3",
                question: "1-2-3",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.2.4",
                question: "1-2-4",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.2.5",
                question: "1-2-5",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.2.6",
                question: "1-2-6",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "1.3",
          question: "1-3",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "1.3.1",
                question: "1-3-1",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.3.2",
                question: "1-3-2",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.3.3",
                question: "1-3-3",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "1.4",
          question: "1-4",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "1.4.1",
                question: "1-4-1",
                options: ["TRUE", "FALSE"],
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.4.2",
                question: "1-4-2",
                options: ["TRUE", "FALSE"],
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "1.4.3",
                question: "1-4-3",
                options: ["TRUE", "FALSE"],
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: false,
              next: true,
              subNext: false,
              subSubNext: false
            }
          }
        },
      ],
      "FALSE": {
        answer: false,
        next: true,
        subNext: false,
        subSubNext: false
      }
    }
  },
  {
    id: "2",
    hidden: false,
    question: "2",
    options: ["TRUE", "FALSE"],
    start: true,
    type: "next",
    answer: {
      "TRUE": [
        {
          id: "2.1",
          question: "2-1",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "2.1.1",
                question: "2-1-1",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.2.2",
                question: "2-2-2",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.2.3",
                question: "2-2-3",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "2.2",
          question: "2-2",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "2.2.1",
                question: "2-2-1",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.2.2",
                question: "2-2-2",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.2.3",
                question: "2-2-3",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.2.4",
                question: "2-2-4",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.2.5",
                question: "2-2-5",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.2.6",
                question: "2-2-6",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "2.3",
          question: "2-3",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "2.3.1",
                question: "2-3-1",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.3.2",
                question: "2-3-2",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.3.3",
                question: "2-3-3",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "2.4",
          question: "2-4",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "FALSE": [
              {
                id: "2.4.1",
                question: "2-4-1",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.4.2",
                question: "2-4-2",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: false,
                    subSubNext: true
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              },
              {
                id: "2.4.3",
                question: "2-4-3",
                options: ["TRUE", "FALSE"],
                type: "subSubNext",
                answer: {
                  "TRUE": {
                    answer: false,
                    next: false,
                    subNext: true,
                    subSubNext: false
                  },
                  "FALSE": {
                    answer: true,
                    next: true,
                    subNext: false,
                    subSubNext: false
                  }
                }
              }
            ],
            "TRUE":{
              answer: false,
              next: true,
              subNext: false,
              subSubNext: false
            }
          }
        },
      ],
      "FALSE": {
        answer: false,
        next: true,
        subNext: false,
        subSubNext: false
      }
    }
  },
  {
    id: "3",
    hidden: true,
    question: "3",
    options: ["TRUE", "FALSE"],
    start: true,
    type: "next",
    answer: {
      "TRUE": [
        {
          id: "3.1",
          question: "3-1",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "3.2",
          question: "3-2",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "3.3",
          question: "3-3",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "3.4",
          question: "3-4",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "3.5",
          question: "3-5",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: true,
              subNext: false,
              subSubNext: false
            }
          }
        }
      ],
      "FALSE": {
        answer: false,
        next: true,
        subNext: false,
        subSubNext: false
      }
    }
  },
  {
    id: "4",
    hidden: true,
    question: "4",
    options: ["TRUE", "FALSE"],
    start: true,
    type: "next",
    answer: {
      "TRUE": [
        {
          id: "4.1",
          question: "4-1",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "4.2",
          question: "4-2",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "4.3",
          question: "4-3",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "4.4",
          question: "4-4",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "4.5",
          question: "4-5",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: true,
              subNext: false,
              subSubNext: false
            }
          }
        }
      ],
      "FALSE": {
        answer: false,
        next: true,
        subNext: false,
        subSubNext: false
      }
    }
  },
  {
    id: "5",
    hidden: true,
    question: "5",
    options: ["TRUE", "FALSE"],
    start: true,
    type: "next",
    answer: {
      "TRUE": [
        {
          id: "5.1",
          question: "5-1",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "5.2",
          question: "5-2",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: true,
              subSubNext: false
            }
          }
        },
        {
          id: "5.3",
          question: "5-3",
          options: ["TRUE", "FALSE"],
          type: "subNext",
          answer: {
            "TRUE": {
              answer: true,
              next: true,
              subNext: false,
              subSubNext: false,
              end: true
            },
            "FALSE":{
              answer: false,
              next: false,
              subNext: false,
              subSubNext: false,
              end: true
            }
          }
        }
      ],
      "FALSE": {
        answer: false,
        next: false,
        subNext: false,
        subSubNext: false,
        end: true
      }
    }
  }
];

export default questionsData;