import { useState } from 'react'
import './App.css'

type Answer = 'O' | 'X'

const questions: { statement: string; answer: Answer; explanation: string }[] = [
  {
    statement: '웹 브라우저는 HTML을 읽어 웹페이지의 구조를 보여줘요.',
    answer: 'O',
    explanation: '맞아요! HTML은 제목, 문단, 이미지처럼 페이지의 뼈대를 만들어요.',
  },
  {
    statement: '인공지능은 언제나 사람처럼 감정을 느껴요.',
    answer: 'X',
    explanation: 'AI는 감정을 느끼는 것이 아니라, 학습한 정보를 바탕으로 답을 만들어요.',
  },
  {
    statement: 'CSS를 사용하면 웹페이지의 색과 글꼴을 꾸밀 수 있어요.',
    answer: 'O',
    explanation: '정답이에요! CSS는 웹페이지의 색상, 간격, 글꼴과 배치를 담당해요.',
  },
  {
    statement: 'AI가 알려준 내용은 항상 사실이므로 확인할 필요가 없어요.',
    answer: 'X',
    explanation: 'AI도 틀린 정보를 말할 수 있어요. 중요한 내용은 믿을 만한 자료로 확인해요.',
  },
  {
    statement: '웹사이트는 컴퓨터와 휴대폰에서 모두 볼 수 있게 만들 수 있어요.',
    answer: 'O',
    explanation: '맞아요! 화면 크기에 맞춰 바뀌는 디자인을 적용하면 다양한 기기에서 편하게 볼 수 있어요.',
  },
]

function App() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<Answer | null>(null)
  const [score, setScore] = useState(0)
  const finished = current >= questions.length
  const question = questions[current]

  function choose(answer: Answer) {
    if (selected) return
    setSelected(answer)
    if (answer === question.answer) setScore((value) => value + 1)
  }

  function next() {
    setCurrent((value) => value + 1)
    setSelected(null)
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="한입 퀴즈 홈">
          <span className="brand-mark">ㅎ</span>
          <span>한입 퀴즈</span>
        </a>
        <span className="topbar-note"><span className="sparkle">✳</span> 오늘의 작은 배움</span>
      </header>

      <section className="quiz-layout" aria-live="polite">
        <div className="intro">
          <span className="eyebrow"><span className="eyebrow-dot" /> WEB &amp; AI</span>
          <h1>웹과 AI,<br />얼마나 알고 있나요?</h1>
          <p>가볍게 풀어보는 OX 퀴즈<br />다섯 문제로 확인해 봐요.</p>
          <div className="intro-doodle" aria-hidden="true"><span>✳</span><span>✦</span></div>
        </div>

        <div className="quiz-card">
          {!finished ? (
            <>
              <div className="card-topline">
                <span className="question-count">QUESTION <b>{String(current + 1).padStart(2, '0')}</b><i> / 05</i></span>
                <span className="progress-label">{current + 1} / 5</span>
              </div>
              <div className="progress-track" aria-label={`전체 5문제 중 ${current + 1}번째`}>
                <span style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
              <div className="question-body">
                <span className="question-kicker">맞으면 O, 틀리면 X!</span>
                <h2>{question.statement}</h2>
                <div className="answer-buttons" role="group" aria-label="정답 선택">
                  {(['O', 'X'] as const).map((answer) => {
                    const isSelected = selected === answer
                    const isCorrect = selected !== null && question.answer === answer
                    const isWrong = isSelected && answer !== question.answer
                    return (
                      <button
                        className={`answer-button answer-${answer.toLowerCase()}${isSelected ? ' selected' : ''}${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`}
                        key={answer}
                        onClick={() => choose(answer)}
                        disabled={selected !== null}
                        aria-label={`${answer} 선택`}
                      >
                        <span className="answer-letter">{answer}</span>
                        <span className="answer-caption">{answer === 'O' ? '맞아요' : '아니에요'}</span>
                      </button>
                    )
                  })}
                </div>
                {selected && (
                  <div className={`feedback ${selected === question.answer ? 'feedback-correct' : 'feedback-wrong'}`}>
                    <span className="feedback-icon" aria-hidden="true">{selected === question.answer ? '✓' : '!'}</span>
                    <div><strong>{selected === question.answer ? '정답이에요!' : '아쉬워요, 오답이에요.'}</strong><p>{question.explanation}</p></div>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <span className="encouragement">천천히 생각해도 괜찮아요 <span aria-hidden="true">☺</span></span>
                {selected && <button className="next-button" onClick={next}>{current === questions.length - 1 ? '결과 보기' : '다음 문제'} <span aria-hidden="true">→</span></button>}
              </div>
            </>
          ) : (
            <div className="result-view">
              <div className="result-icon" aria-hidden="true">{score >= 4 ? '🎉' : '🌱'}</div>
              <span className="question-kicker">QUIZ COMPLETE</span>
              <h2>{score >= 4 ? '정말 잘했어요!' : '끝까지 풀었어요!'}</h2>
              <p className="result-copy">웹과 AI에 대해 한 걸음 더 알게 됐어요.</p>
              <div className="score-box"><span>나의 점수</span><strong>{score}<small> / 5</small></strong></div>
              <button className="restart-button" onClick={restart}>↻ <span>다시 풀기</span></button>
              <p className="result-footnote">다시 풀면서 새로운 내용을 복습해 봐요.</p>
            </div>
          )}
        </div>
      </section>
      <footer className="page-footer"><span>작은 호기심이 큰 배움이 돼요.</span><span>MADE FOR CURIOUS MINDS <span className="footer-star">✳</span></span></footer>
    </main>
  )
}

export default App
