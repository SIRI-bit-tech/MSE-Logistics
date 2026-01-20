import { Redis } from '@upstash/redis'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

export const redis = redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
    })
    : null

export const getCache = async <T>(key: string): Promise<T | null> => {
    if (!redis) return null
    try {
        return await redis.get(key)
    } catch (error) {
        console.error('Redis get error:', error)
        return null
    }
}

export const setCache = async (key: string, value: any, ttlSeconds: number = 300) => {
    if (!redis) return
    try {
        await redis.set(key, value, { ex: ttlSeconds })
    } catch (error) {
        console.error('Redis set error:', error)
    }
}

export const delCache = async (key: string) => {
    if (!redis) return
    try {
        await redis.del(key)
    } catch (error) {
        console.error('Redis del error:', error)
    }
}
