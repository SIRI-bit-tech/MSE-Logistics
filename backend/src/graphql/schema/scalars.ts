import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { Scalar } from "@nestjs/graphql"

@Scalar("DateTime", () => Date)
export class DateTimeScalar extends GraphQLScalarType {
  constructor() {
    super({
      name: "DateTime",
      description: "Date custom scalar type",
      serialize: (value: unknown): string => {
        if (value instanceof Date) return value.toISOString()
        throw new GraphQLError(`Value is not a valid Date: ${value}`)
      },
      parseValue: (value: unknown): Date => {
        if (value instanceof Date) return value
        if (typeof value === "number") return new Date(value)
        if (typeof value === "string") return new Date(value)
        throw new GraphQLError(`Value is not a valid Date: ${value}`)
      },
      parseLiteral: (ast: any): Date => {
        if (ast.kind === Kind.INT) return new Date(Number.parseInt(ast.value, 10))
        if (ast.kind === Kind.STRING) return new Date(ast.value)
        throw new GraphQLError(`Value is not a valid Date: ${ast.value}`)
      }
    })
  }
}

@Scalar("Decimal", () => String)
export class DecimalScalar extends GraphQLScalarType {
  constructor() {
    super({
      name: "Decimal",
      description: "Decimal custom scalar type",
      serialize: (value: unknown): string => String(value),
      parseValue: (value: unknown): string => String(value),
      parseLiteral: (ast: any): string => ast.value
    })
  }
}

@Scalar("JSON", () => Object)
export class JSONScalar extends GraphQLScalarType {
  constructor() {
    super({
      name: "JSON",
      description: "JSON custom scalar type",
      serialize: (value: unknown): Record<string, any> => value as Record<string, any>,
      parseValue: (value: unknown): Record<string, any> => value as Record<string, any>,
      parseLiteral: (ast: any): Record<string, any> => ast.value
    })
  }
}
