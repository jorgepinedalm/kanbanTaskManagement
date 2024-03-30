import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import { Board } from '../models/board.model';
import { ColumnStatus } from '../models/column-status.model';

describe('BoardService', () => {
  let service: BoardService;
  const mockBoards :Board[] = [
    {idBoard: 1, name: "Platform", columnStatus: []},
    {idBoard: 2, name: "Marketing", columnStatus: []},
    {idBoard: 3, name: "Roadmap", columnStatus: []}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe("fetchBoards", () => {
    it("should returns boards", () => {
      
      service['boards'] = [...mockBoards];
      service.fetchBoards().subscribe(boards => {
        expect(boards).toEqual(mockBoards);
      })
    })
  })

  describe("getBoardById", () => {
    it("should return a board from the boards array given its id", () => {
      service['boards'] = [...mockBoards];
      service.getBoardById(2).subscribe(board => {
        expect(board?.idBoard).toEqual(2);
      })
    })

    it("should not return a board from the boards array if it does not exist", () => {
      service['boards'] = [...mockBoards];
      service.getBoardById(4).subscribe(board => {
        expect(board).toEqual(undefined);
      })
    })
  });

  describe("addBoards", () => {
    it("should add a new board in boards array", () => {
      service['boards'] = [];
      const mockBoard:Board = {idBoard: 5, name: "board 5", columnStatus: []}
      service.addBoards(mockBoard).subscribe(board => {
        expect(board.idBoard).toEqual(mockBoard.idBoard);
      })
    })
    
  })

  describe("deleteBoard", () => {
    it("should remove a board form boards array given a id", () => {
      service['boards'] = [...mockBoards];
      service.deleteBoard(2).subscribe(boards => {
        expect(boards.find(board => board.idBoard === 2)).toBeUndefined();
        expect(boards).toHaveLength(2);
      })
    })
  })

  describe("updateBoard", () => {
    it("should update the board data in a existing board", () => {
      const originalBoard:Board = {idBoard: 5, name: "board 5", columnStatus: []}
      service['boards'] = [...mockBoards, originalBoard];
      const changedBoard:Board = {idBoard: 5, name: "board cinco", columnStatus: []}
      service.updateBoard(changedBoard, 5).subscribe(board => {
        expect(board?.name).toEqual("board cinco");
      })
    })
    it("should not update the board data if it does not exist", () => {
      const originalBoard:Board = {idBoard: 5, name: "board 5", columnStatus: []}
      service['boards'] = [...mockBoards, originalBoard];
      const changedBoard:Board = {idBoard: 5, name: "board cinco", columnStatus: []}
      service.updateBoard(changedBoard, 6).subscribe(board => {
        expect(board).toBeUndefined();
      })
    })
  })

  describe("getStatusFromBoard", () => {
    it("should get status from board columns", () => {
      const columnStatus:ColumnStatus[] = [{idColumnStatus: 1, name: "column 1", tasks: []}]
      const mockBoard:Board = {idBoard: 5, name: "board 5", columnStatus: columnStatus};
      service['boards'] = [mockBoard];
      service.getStatusFromBoard(5).subscribe(status => {
        expect(status).toEqual(columnStatus);
      })
    })
    it("should get empty array if idboard dont exist", () => {
      const columnStatus:ColumnStatus[] = [{idColumnStatus: 1, name: "column 1", tasks: []}]
      const mockBoard:Board = {idBoard: 5, name: "board 5", columnStatus: columnStatus};
      service['boards'] = [mockBoard];
      service.getStatusFromBoard(6).subscribe(status => {
        expect(status).toHaveLength(0)
      })
    })
  })

  describe("addColumn", () => {
    it("should add new column in board", () => {
      const newColumn = {idColumnStatus: 0, name: "column 2", tasks: []};
      const columnStatus:ColumnStatus[] = [{idColumnStatus: 3, name: "column 1", tasks: []}]
      const mockBoard:Board = {idBoard: 5, name: "board 5", columnStatus: columnStatus};
      service['boards'] = [mockBoard];
      service.addColumn(5, newColumn).subscribe(board => {
        expect(board.columnStatus).toHaveLength(2);
        expect(board.columnStatus[1].idColumnStatus).toEqual(4);
      })
    })
    it("should not add new column in board if idboard dont exist", () => {
      const newColumn = {idColumnStatus: 0, name: "column 2", tasks: []};
      const columnStatus:ColumnStatus[] = [{idColumnStatus: 1, name: "column 1", tasks: []}]
      const mockBoard:Board = {idBoard: 5, name: "board 5", columnStatus: columnStatus};
      service['boards'] = [mockBoard];
      service.addColumn(6, newColumn).subscribe(board => {
        expect(board.columnStatus).toHaveLength(1);
      })
    })
  })
  
});
