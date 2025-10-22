// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"
// import { Minus, Plus, Trash2 } from "lucide-react"

// export function CartItem({ item, onIncrease, onDecrease, onRemove }) {
//   return (
//     <Card className="flex items-center justify-between p-4">
//       <div className="flex items-center gap-4">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-20 h-20 object-cover rounded-xl"
//         />
//         <div>
//           <CardHeader className="p-0">
//             <CardTitle>{item.name}</CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <p className="text-sm text-muted-foreground">${item.price}</p>
//           </CardContent>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <Button size="icon" variant="outline" onClick={onDecrease}>
//           <Minus className="h-4 w-4" />
//         </Button>
//         <span className="font-medium">{item.quantity}</span>
//         <Button size="icon" variant="outline" onClick={onIncrease}>
//           <Plus className="h-4 w-4" />
//         </Button>
//         <Button
//           size="icon"
//           variant="destructive"
//           onClick={() => {
//             onRemove()
//             toast("Producto eliminado del carrito", { description: item.name })
//           }}
//         >
//           <Trash2 className="h-4 w-4" />
//         </Button>
//       </div>
//     </Card>
//   )
// }
