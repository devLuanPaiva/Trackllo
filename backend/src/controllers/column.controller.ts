import { Hono } from 'hono'
import ColumnService from '../services/column.service.js'
import { successResponse, errorResponse } from '../utils/apiResponse.js'
import validator from '../validators/column.validator.js'

const columnRoutes = new Hono()

columnRoutes.use('*', async (c, next) => {
    const userId = c.req.header('X-User-Id') ?? 'default-user-id'
    c.set('userId', userId)
    await next()
})

columnRoutes.get('/board/:boardId', validator.boardId, async (c) => {
    const { boardId } = c.req.valid('param')
    const userId = c.get('userId')
    console.log(boardId, userId)

    try {
        const columns = await ColumnService.getBoardColumns(boardId, userId)
        return successResponse(c, columns)
    } catch (error: any) {
        if (error.message === 'Board not found or not owned by user') {
            return errorResponse(c, error.message, 404)
        }
        return errorResponse(c, error.message, 500)
    }
})

columnRoutes.get('/:id', validator.columnId, async (c) => {
    const { id } = c.req.valid('param')
    const userId = c.get('userId')

    try {
        const column = await ColumnService.getColumnById(id, userId)
        if (!column) {
            return errorResponse(c, 'Column not found', 404)
        }
        return successResponse(c, column)
    } catch (error: any) {
        return errorResponse(c, error.message, 500)
    }
})

columnRoutes.post('/', validator.createColumn, async (c) => {
    const { boardId, title } = c.req.valid('json')
    const userId = c.get('userId')

    try {
        const newColumn = await ColumnService.createColumn(boardId, userId, title)
        return successResponse(c, newColumn, 201)
    } catch (error: any) {
        if (error.message === 'Board not found or not owned by user') {
            return errorResponse(c, error.message, 404)
        }
        return errorResponse(c, error.message, 400)
    }
})

columnRoutes.put('/:id', validator.columnId, validator.updateColumn, async (c) => {
    const { id } = c.req.valid('param')
    const { title } = c.req.valid('json')
    const userId = c.get('userId')

    try {
        const updatedColumn = await ColumnService.updateColumn(id, userId, { title })
        return successResponse(c, updatedColumn)
    } catch (error: any) {
        if (error.message === 'Column not found or not owned by user') {
            return errorResponse(c, error.message, 404)
        }
        return errorResponse(c, error.message, 400)
    }
})

columnRoutes.delete('/:id', validator.columnId, async (c) => {
    const { id } = c.req.valid('param')
    const userId = c.get('userId')

    try {
        const deletedColumn = await ColumnService.deleteColumn(id, userId)
        return successResponse(c, deletedColumn)
    } catch (error: any) {
        if (error.message === 'Column not found or not owned by user') {
            return errorResponse(c, error.message, 404)
        }
        return errorResponse(c, error.message, 400)
    }
})

export default columnRoutes