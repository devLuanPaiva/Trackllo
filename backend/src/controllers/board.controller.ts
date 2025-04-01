import { Hono } from 'hono'
import BoardService from '../services/board.service.js'
import { successResponse, errorResponse } from '../utils/apiResponse.js'
import validator from '../validators/board.validator.js'

const boardRoutes = new Hono()


boardRoutes.use('*', async (c, next) => {
    c.set('userId', 'some-user-id')
    await next()
})


boardRoutes.get('/', async (c) => {
    const userId = c.get('userId')

    try {
        const boards = await BoardService.getUserBoards(userId)
        return successResponse(c, boards)
    } catch (error: any) {
        return errorResponse(c, error.message, 500)
    }
})


boardRoutes.get('/:id', validator.boardId, async (c) => {
    const { id } = c.req.valid('param')
    const userId = c.get('userId')

    try {
        const board = await BoardService.getBoardById(id, userId)
        if (!board) {
            return errorResponse(c, 'Board not found', 404)
        }
        return successResponse(c, board)
    } catch (error: any) {
        return errorResponse(c, error.message, 500)
    }
})


boardRoutes.post('/', async (c) => {
    const userId = c.get('userId')

    try {
        const newBoard = await BoardService.createBoard(userId)
        return successResponse(c, newBoard, 201)
    } catch (error: any) {
        if (error.message === 'User not found') {
            return errorResponse(c, error.message, 404)
        }
        return errorResponse(c, error.message, 400)
    }
})


boardRoutes.delete('/:id', validator.boardId, async (c) => {
    const { id } = c.req.valid('param')
    const userId = c.get('userId')

    try {
        const deletedBoard = await BoardService.deleteBoard(id, userId)
        return successResponse(c, deletedBoard)
    } catch (error: any) {
        if (error.message === 'Board not found or not owned by user') {
            return errorResponse(c, error.message, 404)
        }
        return errorResponse(c, error.message, 400)
    }
})

export default boardRoutes