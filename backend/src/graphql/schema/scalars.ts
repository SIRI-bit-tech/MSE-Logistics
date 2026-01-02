import { type GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { Scalar } from "@nestjs/graphql"

@Scalar("DateTime", () => Date)
export class DateTimeScalar implements GraphQLScalarType {
  description = "Date custom scalar type"

  parseValue(value: unknown): Date {
    if (value instanceof Date) return value
    if (typeof value === "number") return new Date(value)
    if (typeof value === "string") return new Date(value)
    throw new GraphQLError(`Value is not a valid Date: ${value}`)
  }

  serialize(value: unknown): string {
    if (value instanceof Date) return value.toISOString()
    throw new GraphQLError(`Value is not a valid Date: ${value}`)
  }

  parseLiteral(ast): Date {
    if (ast.kind === Kind.INT) return new Date(Number.parseInt(ast.value, 10))
    if (ast.kind === Kind.STRING) return new Date(ast.value)
    throw new GraphQLError(`Value is not a valid Date: ${ast.value}`)
  }
}

@Scalar("Decimal", () => String)
export class DecimalScalar {
  description = "Decimal custom scalar type"

  parseValue(value: unknown): string {
    return String(value)
  }

  serialize(value: unknown): string {
    return String(value)
  }

  parseLiteral(ast): string {
    return ast.value
  }
}

@Scalar("JSON", () => Object)
export class JSONScalar {
  description = "JSON custom scalar type"

  parseValue(value: unknown): Record<string, any> {
    return value as Record<string, any>
  }

  serialize(value: unknown): Record<string, any> {
    return value as Record<string, any>
  }

  parseLiteral(ast): Record<string, any> {
    return ast.value
  }
}
