# Test Chatbot - Sample Queries

This file contains sample queries you can use to test all features of the AI Shopping Assistant.

## 🧪 Testing Checklist

### ✅ Basic Functionality

- [ ] Chatbot button appears in bottom-right
- [ ] Chat window opens when clicked
- [ ] Greeting message is displayed
- [ ] Can type and send messages
- [ ] Bot responds within 2-3 seconds
- [ ] Conversation history maintained
- [ ] Can close and reopen chat
- [ ] Messages persist during session

---

## 📋 Test Queries by Category

### 1️⃣ Product Discovery - General Queries

**Test Query 1**:

```
"Hi, I'm looking for outdoor equipment"
```

**Expected**: Bot greets and asks for specifics about outdoor gear

**Test Query 2**:

```
"Show me camping gear"
```

**Expected**: Bot recommends camping products with names, prices, and features

**Test Query 3**:

```
"I need affordable running shoes under $100"
```

**Expected**: Bot filters and suggests running shoes in that price range

**Test Query 4**:

```
"What laptops do you have?"
```

**Expected**: Bot lists available laptops with specs and prices

**Test Query 5**:

```
"Recommend hiking boots for winter"
```

**Expected**: Bot suggests winter-appropriate hiking boots

### 2️⃣ Product Discovery - Specific Features

**Test Query 6**:

```
"Do you have waterproof jackets?"
```

**Expected**: Bot finds jackets and mentions waterproof features

**Test Query 7**:

```
"Show me products from Nike"
```

**Expected**: Bot filters products by Nike brand

**Test Query 8**:

```
"I'm looking for electronics"
```

**Expected**: Bot shows electronic products available

**Test Query 9**:

```
"What's on sale right now?"
```

**Expected**: Bot mentions current products (may not filter by sale without that feature)

**Test Query 10**:

```
"Best products for beginners"
```

**Expected**: Bot recommends entry-level or beginner-friendly products

### 3️⃣ Follow-up Questions (Context Testing)

**Conversation 1**:

```
User: "Show me tents"
Bot: [Shows tents]
User: "What about the first one?"
```

**Expected**: Bot refers back to the first tent mentioned

**Conversation 2**:

```
User: "I need camping gear"
Bot: [Shows camping gear]
User: "Which one is best for cold weather?"
```

**Expected**: Bot filters recommendations for cold weather

**Conversation 3**:

```
User: "Show me backpacks"
Bot: [Shows backpacks]
User: "What's the biggest one?"
```

**Expected**: Bot identifies the backpack with largest capacity

### 4️⃣ Store Policies & FAQs

**Test Query 11**:

```
"What's your return policy?"
```

**Expected**: "30-day return policy. Items must be unused and in original packaging."

**Test Query 12**:

```
"Do you offer free shipping?"
```

**Expected**: "Free delivery on orders over $100. Standard delivery is $5."

**Test Query 13**:

```
"What payment methods do you accept?"
```

**Expected**: "Credit cards, PayPal, and Apple Pay"

**Test Query 14**:

```
"How long does shipping take?"
```

**Expected**: "Standard: 3-5 business days, Express: 1-2 days"

**Test Query 15**:

```
"What about warranty?"
```

**Expected**: "All electronics come with 1-year manufacturer warranty"

**Test Query 16**:

```
"How can I contact customer support?"
```

**Expected**: "Mon-Fri 9AM-6PM EST via email or chat"

### 5️⃣ Order Tracking (Requires Login)

**Test Query 17** (Not logged in):

```
"Where is my order?"
```

**Expected**: Bot asks user to log in or provides general order info

**Test Query 18** (Logged in):

```
"Track my order"
```

**Expected**: Bot shows user's recent orders with status

**Test Query 19** (Logged in):

```
"What did I order last week?"
```

**Expected**: Bot lists orders from last week

**Test Query 20** (Logged in):

```
"Show my order history"
```

**Expected**: Bot displays recent orders with details

### 6️⃣ Complex/Conversational Queries

**Test Query 21**:

```
"I'm planning a camping trip next month. What should I buy?"
```

**Expected**: Bot suggests essential camping items (tent, sleeping bag, etc.)

**Test Query 22**:

```
"My son plays basketball. Gift ideas under $150?"
```

**Expected**: Bot recommends basketball-related products

**Test Query 23**:

```
"I'm new to hiking. What do I need to start?"
```

**Expected**: Bot suggests beginner hiking essentials

**Test Query 24**:

```
"Best gift for someone who loves running?"
```

**Expected**: Bot recommends running-related products

**Test Query 25**:

```
"I want to upgrade my home office setup"
```

**Expected**: Bot suggests office-related electronics/furniture

### 7️⃣ Edge Cases & Error Handling

**Test Query 26**:

```
"asdfghjkl"
```

**Expected**: Bot politely says it doesn't understand and offers help

**Test Query 27**:

```
"How's the weather today?"
```

**Expected**: Bot redirects to shopping assistance

**Test Query 28**:

```
""
```

(Empty message)
**Expected**: Send button should be disabled

**Test Query 29**:

```
"Tell me a joke"
```

**Expected**: Bot stays on topic and offers shopping help

**Test Query 30**:

```
Very long message... (500+ characters)
```

**Expected**: Bot handles long input gracefully

### 8️⃣ Multi-turn Conversations

**Full Conversation Test**:

```
User: "Hi"
Bot: [Greeting]

User: "I need running shoes"
Bot: [Shows shoes]

User: "What about the blue ones?"
Bot: [Refers to specific shoe]

User: "Is that in stock?"
Bot: [Provides stock info]

User: "What's your shipping policy?"
Bot: [Explains shipping]

User: "Great, thanks!"
Bot: [Closing message]
```

---

## 🎯 Success Criteria

### Response Quality

- ✅ Responses are relevant to query
- ✅ Includes specific product details (name, price)
- ✅ Friendly and helpful tone
- ✅ Accurate policy information
- ✅ Understands context from previous messages

### Performance

- ✅ Response time < 5 seconds
- ✅ No errors in console
- ✅ Smooth UI animations
- ✅ No lag when typing

### UI/UX

- ✅ Messages display correctly
- ✅ Timestamps show properly
- ✅ Scrolling works smoothly
- ✅ Input clears after sending
- ✅ Loading indicator appears
- ✅ Chat window responsive

---

## 🐛 Known Limitations

1. **Product Recommendations**: Require products to be indexed in Pinecone

   - Run: `curl -X POST https://localhost:5001/api/products/index`

2. **Order Tracking**: Only works for authenticated users

   - User must be logged in

3. **Semantic Search**: Requires Gemini and Pinecone API keys

   - Check `.env` file

4. **Memory**: Conversation history stored in browser (not persistent)
   - Refreshing page clears history

---

## 📊 Testing Results Template

Date: ****\_\_\_****
Tester: ****\_\_\_****

| Query # | Category | Pass/Fail | Notes |
| ------- | -------- | --------- | ----- |
| 1       | Products | ⬜        |       |
| 2       | Products | ⬜        |       |
| 11      | FAQs     | ⬜        |       |
| 17      | Orders   | ⬜        |       |
| 26      | Edge     | ⬜        |       |

**Overall Score**: \_\_\_/30

**Issues Found**:

1.
2.
3.

**Recommendations**:

1.
2.
3.

---

## 🔍 Debugging Tips

### If bot doesn't respond:

1. Check browser console (F12)
2. Verify API is running: `curl https://localhost:5001/api/chat/health`
3. Check Gemini API key in `.env`
4. Look at terminal logs

### If product recommendations are generic:

1. Ensure products are indexed
2. Check Pinecone configuration
3. Verify semantic search is working

### If orders don't show:

1. Check if user is logged in
2. Verify database has orders for that user
3. Check console for auth errors

---

## 🎬 Demo Script (For Presentations)

**Scene 1: Product Discovery**

> "Let me show you our AI shopping assistant. I'll ask it to help me find camping gear."
>
> Types: "I'm planning a camping trip. What do I need?"
>
> "As you can see, it understands natural language and recommends relevant products with prices."

**Scene 2: Follow-up Questions**

> "Now watch how it handles follow-up questions..."
>
> Types: "What about the tent? Tell me more."
>
> "It remembers the context from our previous message!"

**Scene 3: Store Policies**

> "It also answers questions about store policies..."
>
> Types: "What's your return policy?"
>
> "Instant, accurate information!"

**Scene 4: Order Tracking**

> "For logged-in users, it can track orders..."
>
> Types: "Where is my order?"
>
> "Personalized order information right in the chat!"

---

**Happy Testing! 🚀**
