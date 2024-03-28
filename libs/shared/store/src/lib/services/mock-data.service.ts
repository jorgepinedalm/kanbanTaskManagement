import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private board:Board[];
  constructor() { 
    this.board = [
      { 
        idBoard: 1, 
        name: "Platform Launch", 
        columnStatus: [
          {
            idColumnStatus: 1, 
            name: "todo",
            order: 1,
            tasks: [
              {
                idTask: 1,
                title: "Build UI for onboarding flow",
                order: 1,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "todo",
                subtask: [
                  {
                    idSubtask: 1,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  },
                  {
                    idSubtask: 2,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  },
                  {
                    idSubtask: 3,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 2,
                title: "Build UI for search",
                order: 2,
                description: "",
                status: "todo",
                subtask: [
                  {
                    idSubtask: 4,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 3,
                title: "Build settings UI",
                order: 3,
                description: "",
                status: "todo",
                subtask: [
                  {
                    idSubtask: 5,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  },
                  {
                    idSubtask: 6,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 4,
                title: "QA and test all major user journeys",
                order: 4,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "todo",
                subtask: [
                  {
                    idSubtask: 7,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  },
                  {
                    idSubtask: 8,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              }
            ]
          },
          {
            idColumnStatus: 2, 
            name: "doing",
            order: 2,
            tasks: [
              {
                idTask: 5,
                title: "Design settings and search pages",
                order: 1,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "doing",
                subtask: [
                  {
                    idSubtask: 9,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 10,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  },
                  {
                    idSubtask: 11,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 6,
                title: "Add account management endpoints",
                order: 2,
                description: "",
                status: "doing",
                subtask: [
                  {
                    idSubtask: 12,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 13,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 14,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 7,
                title: "Design onboarding flow",
                order: 3,
                description: "",
                status: "doing",
                subtask: [
                  {
                    idSubtask: 15,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 16,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  },
                  {
                    idSubtask: 17,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 8,
                title: "Add search endpoints",
                order: 4,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "doing",
                subtask: [
                  {
                    idSubtask: 18,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 19,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 9,
                title: "Add authentication endpoints",
                order: 5,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "doing",
                subtask: [
                  {
                    idSubtask: 20,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 21,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              },
              {
                idTask: 10,
                title: "Research pricing points of various competitors and trial different business models",
                order: 6,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "doing",
                subtask: [
                  {
                    idSubtask: 22,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 23,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  },
                  {
                    idSubtask: 24,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: false
                  }
                ]
              }
            ]
          },
          {
            idColumnStatus: 3,
            name: "done",
            order: 3,
            tasks: [
              {
                idTask: 11,
                title: "Conduct 5 wirefrimes tests",
                order: 1,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "done",
                subtask: [
                  {
                    idSubtask: 25,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  }
                ]
              },
              {
                idTask: 12,
                title: "Create wirframe prototype",
                order: 2,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "done",
                subtask: [
                  {
                    idSubtask: 26,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  }
                ]
              },
              {
                idTask: 13,
                title: "Review results of usability tests and iterate",
                order: 3,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "done",
                subtask: [
                  {
                    idSubtask: 27,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 28,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 29,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  }
                ]
              },
              {
                idTask: 14,
                title: "Create paper prototypes and conduct 10 usability tests with potential customers",
                order: 4,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna. Proin sit amet massa porttitor, congue dui eu, ullamcorper justo. Etiam maximus velit et odio porttitor hendrerit. Vivamus posuere ante vitae sapien.",
                status: "done",
                subtask: [
                  {
                    idSubtask: 30,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  },
                  {
                    idSubtask: 31,
                    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ultricies libero, non convallis magna.",
                    isDone: true
                  }
                ]
              }
            ]
          }
        ] 
      },
      {
        idBoard: 2,
        name: "Marketing Plan",
        columnStatus: []
      },
      {
        idBoard: 3,
        name: "Roadmap",
        columnStatus: []
      }
    ]
  }

  getBoards():Board[]{
    return this.board;
  }
}
