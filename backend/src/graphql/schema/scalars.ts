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
      parseLiteral: (ast: any): string => {
        if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT || ast.kind === Kind.INT) {
          return String(ast.value)
        }
        throw new GraphQLError(`Value is not a valid Decimal: ${ast.value}`)
      }
    })
  }
}

@Scalar("JSON", () => Object)
export class JSONScalar extends GraphQLScalarType {
  constructor() {
    super({
      name: "JSON",
      description: "JSON custom scalar type",
      serialize: (value: unknown): any => {
        try {
          return JSON.parse(JSON.stringify(value))
        } catch (error) {
          throw new GraphQLError(`Value is not serializable as JSON: ${error}`)
        }
      },
      parseValue: (value: unknown): any => {
        if (typeof value === "string") {
          try {
            return JSON.parse(value)
          } catch (error) {
            throw new GraphQLError(`Value is not valid JSON: ${error}`)
          }
        }
        if (value === null || typeof value === "object" || Array.isArray(value)) {
          return value
        }
        if (typeof value === "number" || typeof value === "boolean") {
          return value
        }
        throw new GraphQLError(`Value is not valid JSON: ${value}`)
      },
      parseLiteral: (ast: any): any => {
        switch (ast.kind) {
          case Kind.STRING:
            try {
              return JSON.parse(ast.value)
            } catch (error) {
              throw new GraphQLError(`Value is not valid JSON: ${error}`)
            }
          case Kind.OBJECT:
            return this.parseObject(ast)
          case Kind.LIST:
            return ast.values.map((item: any) => this.parseLiteral(item))
          case Kind.INT:
            return parseInt(ast.value, 10)
          case Kind.FLOAT:
            return parseFloat(ast.value)
          case Kind.BOOLEAN:
            return ast.value
          case Kind.NULL:
            return null
          default:
            throw new GraphQLError(`Unsupported AST node kind for JSON: ${ast.kind}`)
        }
      }
    })
  }

  private parseObject(ast: any): Record<string, any> {
    const obj: Record<string, any> = {}
    for (const field of ast.fields) {
      obj[field.name.value] = this.parseLiteral(field.value)
    }
    return obj
  }
}
