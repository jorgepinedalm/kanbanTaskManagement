import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'kanban-board/:id',
        loadChildren: () => import('./kanban-board/kanban-board.module').then(m => m.KanbanBoardModule)
    }
];
